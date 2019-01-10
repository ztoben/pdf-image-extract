<template>
  <label class="file-select">
    <div class="select-button">
      <span v-if="value">Selected File: {{value.name}}</span>
      <span v-else>Select File</span>
    </div>
    <input type="file" accept="application/pdf" @change="handleFileChange"/>
  </label>
</template>

<script>
  export default {
    name: 'FileSelect',

    props: {
      value: File
    },

    methods: {
      handleFileChange(e) {
        this.$emit('input', e.target.files[0])
      }
    }
  }
</script>

<style scoped>
  .file-select > .select-button {
    padding: 1rem;
    color: white;
    background-color: #2EA169;
    border-radius: .3rem;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
  }

  .file-select > input[type="file"] {
    display: none;
  }
</style>
