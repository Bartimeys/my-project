<template>
  <section id="grid-template">
    <table>
      <thead>
      <tr>
        <th v-for="key in columns" :key="key.id"
            @click="sortBy(key)"
            :class="{ active: sortKey === key }">
          {{ key | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="entry in data" :key="entry.id">
        <td v-for="key in columns" :key="key.id">
          {{entry[key]}}
        </td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td>Total :</td>
        <td></td>
        <td class="total">
          {{total}}
        </td>
      </tr>
      </tfoot>
    </table>
  </section>
</template>

<script>
import eventBus from './EventBus.js'
export default {
  name: 'DemoGrid',
  data () {
    let sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders,
      total: []
    }
  },
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      eventBus.$emit('sortChanged', {
        sortKey: key,
        sortOrder: this.sortOrders[key] * -1
      })
      this.sortOrders[key] *= -1
    },
    totalSum: function () {
      let self = this
      let totalData = []
      Object.entries(self.data).forEach(([key, val]) => {
        totalData.push(val.currency) // the value of the current key.
      })
      console.log(totalData.reduce(function (totalData, num) { return totalData + num }, 0))
      self.total = totalData.reduce(function (totalData, num) { return totalData + num }, 0)
      return self.total
    }
  },
  created () {
    this.totalSum()
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

  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
  }
</style>
