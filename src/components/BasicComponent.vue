<template>
  <div id="demo">
    <form id="search">
      Search <input name="query" v-model="searchQuery">
    </form>
    <demo-grid
      :data="gridData"
      :columns="gridColumns"
      :filter-key="searchQuery">
    </demo-grid>
  </div>
</template>

<script>
import DemoGrid from './DemoGrid'
import json from '../../data/test'
export default {
  name: 'BasicComponent',
  components: {
    DemoGrid
  },
  data () {
    return {
      searchQuery: '',
      gridColumns: ['name', 'location', 'currency'],
      gridData: json
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
form{
  display: block;
  margin-top: 0em;
}
</style>
