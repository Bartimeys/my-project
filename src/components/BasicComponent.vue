<template>
  <div id="demo">
    <grid-filter></grid-filter>
    <demo-grid
      :data="visibleData"
      :columns="gridColumns">
    </demo-grid>
    <pager v-bind:page-size="gridSettings.pageSize" :data="originalData"></pager>
  </div>
</template>

<script>
import DemoGrid from './DemoGrid'
import Pager from './Pager'
import GridFilter from './GridFilter'
import json from '../../data/test'
import eventBus from '../assets/utils/EventBus.js'
export default {
  name: 'BasicComponent',
  components: {
    GridFilter,
    DemoGrid,
    Pager
  },
  data () {
    return {
      gridColumns: ['name', 'location', 'currency'],
      originalData: json,
      visibleData: null,
      gridSettings: {
        filter: null,
        sortKey: 'name',
        sortOrder: 1,
        pageNumber: 1,
        pageSize: 10
      }
    }
  },
  created: function () {
    let gridSettings = this.gridSettings

    eventBus.$on('filterChanged', args => {
      gridSettings.filter = args.filter ? args.filter : null
      this.invalidate()
    })

    eventBus.$on('sortChanged', args => {
      gridSettings.sortKey = args.sortKey
      gridSettings.sortOrder = args.sortOrder
      this.invalidate()
    })

    eventBus.$on('pageChanged', args => {
      gridSettings.pageNumber = args.pageNumber
      this.invalidate()
    })

    this.invalidate()
  },
  methods: {
    invalidate: function () {
      let gridSettings = this.gridSettings
      let tmpData = this.originalData.slice()
      let lengthAfterFilter = this.originalData.length

      if (gridSettings.filter) {
        tmpData = this.originalData.filter(function (row) {
          let filterProps = ['name', 'location', 'currency']

          return filterProps.some(function (key) {
            return String(row[key]).toLowerCase().indexOf(gridSettings.filter) !== -1
          })
        })
        lengthAfterFilter = tmpData.length
      }

      tmpData.sort((a, b) => {
        a = a[gridSettings.sortKey]
        b = b[gridSettings.sortKey]
        return (a === b ? 0 : a > b ? 1 : -1) * gridSettings.sortOrder
      })

      let startIndex = (gridSettings.pageNumber - 1) * gridSettings.pageSize
      let endIndex = startIndex + gridSettings.pageSize >= this.originalData.length
        ? startIndex + this.originalData.length - gridSettings.pageSize
        : startIndex + gridSettings.pageSize
      tmpData = tmpData.slice(startIndex, endIndex)

      eventBus.$emit('dataChanged', {
        newLength: lengthAfterFilter
      })

      this.visibleData = tmpData
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
