(function(e){function t(t){for(var r,o,c=t[0],l=t[1],u=t[2],s=0,d=[];s<c.length;s++)o=c[s],a[o]&&d.push(a[o][0]),a[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var l=n[o];0!==a[l]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},i=[];function o(e){return c.p+"js/"+({pdfjsWorker:"pdfjsWorker"}[e]||e)+"."+{pdfjsWorker:"7b5a974a"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise(function(t,r){n=a[e]=[t,r]});t.push(n[2]=r);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=o(e),i=function(t){l.onerror=l.onload=null,clearTimeout(u);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+r+": "+i+")");o.type=r,o.request=i,n[1](o)}a[e]=void 0}};var u=setTimeout(function(){i({type:"timeout",target:l})},12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/pdf-image-extract/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var f=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},2:function(e,t){},3:function(e,t){},4:function(e,t){},5:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("h2",[e._v("Extract PDF Images")]),n("file-select",{model:{value:e.file,callback:function(t){e.file=t},expression:"file"}}),e.file?n("div",{staticClass:"file-actions-container"},[n("div",{staticClass:"radio-container"},[n("p",[e._v("Extraction type:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.extractionStyle,expression:"extractionStyle"}],attrs:{type:"radio",id:"all",value:"All"},domProps:{checked:e._q(e.extractionStyle,"All")},on:{change:function(t){e.extractionStyle="All"}}}),n("label",{attrs:{for:"all"}},[e._v("All Images")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.extractionStyle,expression:"extractionStyle"}],attrs:{type:"radio",id:"bordered",value:"Bordered"},domProps:{checked:e._q(e.extractionStyle,"Bordered")},on:{change:function(t){e.extractionStyle="Bordered"}}}),n("label",{attrs:{for:"bordered"}},[e._v("Bordered Images")]),n("label",{attrs:{for:"r"}},[e._v("R:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.r,expression:"r"}],attrs:{type:"text",id:"r",disabled:"All"===e.extractionStyle},domProps:{value:e.r},on:{input:function(t){t.target.composing||(e.r=t.target.value)}}}),n("label",{attrs:{for:"g"}},[e._v("G:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.g,expression:"g"}],attrs:{type:"text",id:"g",disabled:"All"===e.extractionStyle},domProps:{value:e.g},on:{input:function(t){t.target.composing||(e.g=t.target.value)}}}),n("label",{attrs:{for:"b"}},[e._v("B:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.b,expression:"b"}],attrs:{type:"text",id:"b",disabled:"All"===e.extractionStyle},domProps:{value:e.b},on:{input:function(t){t.target.composing||(e.b=t.target.value)}}})]),e.file?n("button",{on:{click:e.handleExtract}},[e.extracting?n("div",[e._v("Please wait...")]):e._e(),e.extracting?n("div",{staticClass:"lds-ellipsis"},[n("div"),n("div"),n("div"),n("div")]):e._e(),e.extracting?e._e():n("div",[e._v("Extract")])]):e._e()]):e._e(),e._l(e.images,function(t){return n("div",[n("img",{attrs:{alt:"blah",src:e.getImage(t.data,t.width,t.height)}})])}),n("canvas",{style:(e.showCanvas?"":"display: none")+"border:1px solid black; width: calc(100% - 2px);",attrs:{id:"canvas-container"}})],2)},i=[],o=(n("34ef"),n("7f7f"),n("28a5"),n("bd86")),c=(n("6b54"),n("a481"),n("6762"),n("2fdb"),n("e814")),l=n.n(c),u=n("a4bb"),s=n.n(u),f=n("2d1f"),d=n.n(f),p=(n("ac6a"),n("768b")),v=(n("96cf"),n("3b8d")),g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",{staticClass:"file-select"},[n("div",{staticClass:"select-button"},[e.value?n("span",[e._v("Selected File: "+e._s(e.value.name))]):n("span",[e._v("Select File")])]),n("input",{attrs:{type:"file",accept:"application/pdf"},on:{change:e.handleFileChange}})])},h=[],m={name:"FileSelect",props:{value:File},methods:{handleFileChange:function(e){this.$emit("input",e.target.files[0])}}},b=m,y=(n("b338"),n("2877")),x=Object(y["a"])(b,g,h,!1,null,"d1a0ffb0",null);x.options.__file="FileSelect.vue";var w=x.exports,_=n("7152"),j=n("9511"),S=n.n(j),O=n("7c39"),A=n.n(O),P=n("21a6");function k(e,t){S.a.getDocument(e).then(function(e){e.getPage(1).then(function(){var e=Object(v["a"])(regeneratorRuntime.mark(function e(n){var r,a,i,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.getOperatorList();case 2:for(r=e.sent,a=0;a<r.fnArray.length;a++)r.fnArray[a]!==S.a.OPS.paintJpegXObject&&r.fnArray[a]!==S.a.OPS.paintImageXObject||(i=r.argsArray[a][0],o=n.objs.get(i),t.images.push(o));t.extracting=!1;case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())})}function C(e,t){var n=4*t;return[e[n],e[n+1],e[n+2],e[n+3]]}function E(e,t,n,r){return C(e,r*t+n)}function F(e,t,n,r){var a=Object(p["a"])(r,4),i=a[0],o=a[1],c=a[2],l=a[3];e.fillStyle="rgba("+i+","+o+","+c+","+l/255+")",e.fillRect(t,n,1,1)}function I(e){var t=[];return d()(e).forEach(function(e){var n=Object(p["a"])(e,2),r=n[0],a=n[1];s()(a).forEach(function(e){var n=l()(r),a=l()(e);if(t.length>0){var i=!1;e:for(var o=0;o<t.length;o++)for(var c=0;c<t[o].length;c++){var u=t[o][c],s=u.x,f=u.y,d=[s-1,s+1],p=[f-1,f+1];if(d.includes(n)&&f===a||s===n&&p.includes(a)){t[o].push({x:n,y:a}),i=!0;break e}}i||t.push([{x:n,y:a}])}else t.push([{x:n,y:a}])})}),t.filter(function(e){return e.length>50})}function B(e,t,n){var r=document.createElement("canvas"),a=r.getContext("2d"),i=1,o=25e4,c="";r.width=t,r.height=n,a.putImageData(e,0,0);while(o>2e5&&i>0)c=r.toDataURL("image/jpeg",i).replace("data:image/jpeg;base64,",""),o=Math.round(3*c.length/4),i-=.1;return c}function D(e,t){S.a.getDocument(e).then(function(e){e.getPage(1).then(function(){var e=Object(v["a"])(regeneratorRuntime.mark(function e(n){var r,a,i,c,l,u,s,f,d,v,g,h,m,b,y,x,w,_,j;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=1,a=n.getViewport(r),i=document.getElementById("canvas-container"),c=i.getContext("2d"),l={},i.width=a.width,i.height=a.height,e.next=9,n.render({canvasContext:c,viewport:a});case 9:for(u=c.getImageData(0,0,i.width,i.height),s=u.data,f=u.width,d=u.height,v=0;v<f;v++)for(g=0;g<d;g++)h=E(s,f,v,g),m=Object(p["a"])(h,3),b=m[0],y=m[1],x=m[2],b.toString()===t.r&&y.toString()===t.g&&x.toString()===t.b&&(l[v]?l[v][g]=1:l[v]=Object(o["a"])({},g,1));w=I(l),_=new A.a,j=t.file.name.split(".")[0],w.forEach(function(e){var t=e.reduce(function(e,t){return t.y<e?t.y:e},e[0].y),n=e.reduce(function(e,t){return t.y>e?t.y:e},e[0].y),r=e.reduce(function(e,t){return t.x<e?t.x:e},e[0].x),a=e.reduce(function(e,t){return t.x>e?t.x:e},e[0].x),i=10*Math.round((a-r)/10),o=10*Math.round((n-t)/10),l=c.getImageData(r,t,i,o);_.file("".concat(j,"-").concat(i,"x").concat(o,".jpeg"),B(l,i,o),{base64:!0}),e.forEach(function(e){var t=e.x,n=e.y;F(c,t,n,[20,255,20,255])})}),_.generateAsync({type:"blob"}).then(function(e){Object(P["saveAs"])(e,"".concat(j,".zip"))},function(e){console.log(e),alert("There was an error downloading your file. Please try again.")}),t.showCanvas=!0,t.extracting=!1;case 19:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())})}function R(e,t,n){var r=new Uint8Array(n.result);switch(t.extractionStyle){case"All":k(r,t);break;case"Bordered":D(r,t)}}var M={name:"app",components:{FileSelect:w},methods:{handleExtract:function(){this.images=[],this.extracting=!0,this.showCanvas=!1;var e=this,t=new FileReader;t.onload=function(t){R(t,e,this)},t.readAsArrayBuffer(this.file)},getImage:function(e,t,n){return Object(_["getDataUrlFromArr"])(e,t,n)}},data:function(){return{file:null,images:[],extracting:!1,extractionStyle:"All",showCanvas:!1,r:"44",g:"46",b:"53"}}},T=M,N=(n("5c0b"),Object(y["a"])(T,a,i,!1,null,null,null));N.options.__file="App.vue";var $=N.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e($)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("5e27"),a=n.n(r);a.a},"5e27":function(e,t,n){},6:function(e,t){},b338:function(e,t,n){"use strict";var r=n("b7b7"),a=n.n(r);a.a},b7b7:function(e,t,n){}});
//# sourceMappingURL=app.b5042e77.js.map