<template>
  <form id="search">
    <label>Search</label>
    <input name="query" type="text" v-on:keyup="filterChanged" v-model="filter">
  </form>
</template>

<script>
import eventBus from '../assets/utils/EventBus.js'
export default {
  name: 'gridFilter',
  data: function () {
    return {
      filter: null
    }
  },
  methods: {
    filterChanged: function () {
      console.log(this.filter)
      eventBus.$emit('filterChanged', {
        filter: this.filter
      })
    }
  }
}
</script>
