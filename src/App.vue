<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    color: #444;
  }

  body {
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 14px;
    color: #444;
  }

  table {
    border: 2px solid rgb(144, 202, 249);
    border-radius: 3px;
    background-color: #fff;
  }

  th {
    background-color: rgb(144, 202, 249);
    color: rgba(255, 255, 255, 0.66);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  td {
    background-color: #f9f9f9;
  }

  th, td {
    min-width: 120px;
    padding: 10px 20px;
  }

  th.active {
    color: #fff;
  }

  th.active .arrow {
    opacity: 1;
  }

  label {
    position: absolute;
    top: 0;
    display: block;
    width: 100%;
    color: rgba(0, 0, 0, .54);
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 5px 0;
  }

  input {
    width: 20vw;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: block;
    background-color: transparent;
    color: rgba(0, 0, 0, .87);
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, .26);
    outline: 0;
    margin: 5px 0;
    padding: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 0;
    font-size: 16px;
    font-family: inherit;
    line-height: inherit;
    background-image: none;
  }
</style>
