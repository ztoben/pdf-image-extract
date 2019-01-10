<template>
  <div id="app">
    <h2>Extract PDF Images</h2>
    <file-select v-model="file"></file-select>
    <div class="file-actions-container" v-if="file">
      <div class="radio-container">
        <p>Extraction type:</p>
        <input type="radio" id="all" value="All" v-model="extractionStyle">
        <label for="all">All Images</label>
        <input type="radio" id="bordered" value="Bordered" v-model="extractionStyle">
        <label for="bordered">Bordered Images</label>
        <label for="r">R:</label>
        <input type="text" v-model="r" id="r" :disabled="extractionStyle === 'All'"/>
        <label for="g">G:</label>
        <input type="text" v-model="g" id="g" :disabled="extractionStyle === 'All'"/>
        <label for="b">B:</label>
        <input type="text" v-model="b" id="b" :disabled="extractionStyle === 'All'"/>
      </div>
      <button v-if="file" @click="handleExtract">
        <div v-if="extracting">Please wait...</div>
        <div v-if="extracting" class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        <div v-if="!extracting">Extract</div>
      </button>
    </div>
    <div v-for="image in images">
      <img alt="blah" :src="getImage(image.data, image.width, image.height)"/>
    </div>
    <canvas
      id="canvas-container"
      :style="`${showCanvas ? '' : 'display: none'}border:1px solid black; width: calc(100% - 2px);`"
    ></canvas>
  </div>
</template>

<script>
  import FileSelect from './components/FileSelect.vue';
  import {getDataUrlFromArr} from 'array-to-image';
  import PDFJS from 'pdfjs-dist';
  import JSZip from 'jszip';
  import {saveAs} from 'file-saver';

  function getAllImages(typedArray, self) {
    PDFJS.getDocument(typedArray).then(function (pdf) {
      pdf.getPage(1).then(async function (page) {
        const ops = await page.getOperatorList();

        for (let i = 0; i < ops.fnArray.length; i++) {
          if (ops.fnArray[i] === PDFJS.OPS.paintJpegXObject || ops.fnArray[i] === PDFJS.OPS.paintImageXObject) {
            const op = ops.argsArray[i][0];
            const img = page.objs.get(op);

            self.images.push(img);
          }
        }

        self.extracting = false;
      });
    });
  }

  function getPixel(data, index) {
    const i = index * 4;
    return [data[i], data[i+1], data[i+2], data[i+3]] // returns array [R,G,B,A]
  }

  function getPixelXY(data, width, x, y) {
    return getPixel(data, y * width + x);
  }

  function setPixelXY(context, x, y, rgba) {
    const [r, g, b, a] = rgba;

    context.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
    context.fillRect( x, y, 1, 1 );
  }

  function findAllBorders(potentialBorders) {
    const borders = [];

    Object.entries(potentialBorders).forEach(([x, yCoords]) => {
      Object.keys(yCoords).forEach(y => {
        const intX = parseInt(x);
        const intY = parseInt(y);

        if (borders.length > 0) {
          let matchedBorderSet = false;

          borderSearch:
          for (let i = 0; i < borders.length; i++) {
            for (let j = 0; j < borders[i].length; j++) {
              const {x: checkX, y: checkY} = borders[i][j];
              const xRange = [checkX -1, checkX + 1];
              const yRange = [checkY -1, checkY + 1];

              if (
                xRange.includes(intX) && checkY === intY
                || checkX === intX && yRange.includes(intY)
              ) {
                borders[i].push({x: intX, y: intY});
                matchedBorderSet = true;
                break borderSearch;
              }
            }
          }

          if (!matchedBorderSet) borders.push([{x: intX, y: intY}]);
        } else {
          borders.push([{x: intX, y: intY}]);
        }
      });
    });

    return borders.filter(border => border.length > 50); // filter out anomalies
  }

  function getImageURL(imgData, width, height) {
    const newCanvas = document.createElement('canvas');
    const ctx = newCanvas.getContext('2d');
    let quality = 1.0;
    let imgFileSize = 250000;
    let newDataUrl = '';

    newCanvas.width = width;
    newCanvas.height = height;
    ctx.putImageData(imgData, 0, 0);

    while (imgFileSize > 200000 && quality > 0) {
      newDataUrl = newCanvas.toDataURL("image/jpeg", quality).replace('data:image/jpeg;base64,', '');
      imgFileSize = Math.round((newDataUrl.length) * 3 / 4);
      quality -= .1;
    }

    return newDataUrl;
  }

  function getBorderedImages(typedArray, self) {
    PDFJS.getDocument(typedArray).then(function (pdf) {
      pdf.getPage(1).then(async function (page) {
        const scale = 1;
        const viewport = page.getViewport(scale);
        const canvas = document.getElementById('canvas-container');
        const context = canvas.getContext('2d');
        const potentialBorders = {};

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({canvasContext: context, viewport: viewport});

        const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        const {data, width, height} = imgData;

        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            const pixel = getPixelXY(data, width, x, y);
            const [r, g, b] = pixel;

            if (
              r.toString() === self.r
              && g.toString() === self.g
              && b.toString() === self.b
            ) {
              if (potentialBorders[x]) {
                potentialBorders[x][y] = 1;
              } else {
                potentialBorders[x] = {[y]: 1};
              }
            }
          }
        }

        const borders = findAllBorders(potentialBorders);
        const zip = new JSZip();
        const name = self.file.name.split('.')[0];

        borders.forEach(border => {
          const minY = border.reduce((min, p) => p.y < min ? p.y : min, border[0].y);
          const maxY = border.reduce((max, p) => p.y > max ? p.y : max, border[0].y);
          const minX = border.reduce((min, p) => p.x < min ? p.x : min, border[0].x);
          const maxX = border.reduce((max, p) => p.x > max ? p.x : max, border[0].x);

          const width = Math.round((maxX - minX) / 10) * 10;
          const height = Math.round((maxY - minY) / 10) * 10;

          const newImageData = context.getImageData(minX, minY, width, height);

          zip.file(`${name}-${width}x${height}.jpeg`, getImageURL(newImageData, width, height), {base64: true});

          border.forEach(({x, y}) => {
            setPixelXY(context, x, y, [20, 255, 20, 255]);
          });
        });

        zip.generateAsync({type:"blob"}).then(function (blob) {
          saveAs(blob, `${name}.zip`);
        }, function (e) {
          console.log(e);
          alert('There was an error downloading your file. Please try again.');
        });

        self.showCanvas = true;
        self.extracting = false;
      });
    });
  }

  function fileOnload(e, context, _this) {
    const typedArray = new Uint8Array(_this.result);

    switch (context.extractionStyle) {
      case 'All':
        getAllImages(typedArray, context);
        break;
      case 'Bordered':
        getBorderedImages(typedArray, context);
    }
  }

  export default {
    name: 'app',

    components: {
      FileSelect
    },

    methods: {
      handleExtract() {
        this.images = [];
        this.extracting = true;
        this.showCanvas = false;

        let self = this;
        let fileReader = new FileReader();

        fileReader.onload = function (event) {
          fileOnload(event, self, this);
        };

        fileReader.readAsArrayBuffer(this.file);
      },
      getImage(arr, w, h) {
        return getDataUrlFromArr(arr, w, h);
      }
    },

    data() {
      return {
        file: null,
        images: [],
        extracting: false,
        extractionStyle: 'All',
        showCanvas: false,
        r: '44',
        g: '46',
        b: '53'
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    .file-actions-container {
      width: 100%;

      .radio-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        input[type="text"] {
          width: 30px;
        }

        label {
          margin-right: 5px;
          margin-left: 5px;
        }

        p {
          font-weight: bold;
          margin-right: 10px;
        }
      }

      button {
        width: 100%;
        background-color: lightgray;
        border-radius: .3rem;
        padding: 1rem;
        font-weight: bold;
        font-size: 20px;
        cursor: pointer;
        margin-bottom: 20px;
        outline: none;
        border: none;
      }
    }

    img {
      max-width: 100%;
      display: block;
      padding-top: 10px;
    }

    .lds-ellipsis {
      display: inline-block;
      position: relative;
      width: 24px;
      height: 24px;
      margin-left: -52px;
    }

    .lds-ellipsis div {
      position: absolute;
      top: 10px;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: black;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .lds-ellipsis div:nth-child(1) {
      left: 6px;
      animation: lds-ellipsis1 0.6s infinite;
    }

    .lds-ellipsis div:nth-child(2) {
      left: 6px;
      animation: lds-ellipsis2 0.6s infinite;
    }

    .lds-ellipsis div:nth-child(3) {
      left: 26px;
      animation: lds-ellipsis2 0.6s infinite;
    }

    .lds-ellipsis div:nth-child(4) {
      left: 45px;
      animation: lds-ellipsis3 0.6s infinite;
    }

    @keyframes lds-ellipsis1 {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes lds-ellipsis3 {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }

    @keyframes lds-ellipsis2 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(19px, 0);
      }
    }

  }
</style>
