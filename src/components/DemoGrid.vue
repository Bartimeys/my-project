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
        <table-cell  v-bind:cellValue="entry.name"></table-cell>
        <table-cell  v-bind:cellValue="entry.location"></table-cell>
        <table-cell  v-bind:cellValue.sync="entry.currency"></table-cell>
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
import eventBus from '../assets/utils/EventBus.js'
import TableCell from './TableCell'
export default {
  name: 'DemoGrid',
  components: {
    TableCell
  },
  data () {
    let sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
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
    }
  },
  computed: {
    total: function () {
      let self = this
      return self.data.reduce((acc, val) => {
        console.log(this.data)
        return acc + val.currency
      }, 0)
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
    color: rgb(144, 202, 249);
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
