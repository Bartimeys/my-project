<template>
  <div>
    <ul class="pager">
      <li :class="{'pager-link-hidden' : firstHidden}"><a class="first previous round" href="#" v-on:click="first">&laquo;</a></li>
      <li :class="{'pager-link-hidden' : prevHidden}"><a class="prev previous round" href="#" v-on:click="prev">&#8249;</a></li>
      <li>{{pageNumber}}</li>
      <li :class="{'pager-link-hidden' : nextHidden}"><a class="next next round" href="#" v-on:click="next">&#8250;</a></li>
      <li :class="{'pager-link-hidden' :  lastHidden}"><a class="last next round" href="#" v-on:click="last">&raquo;</a></li>
    </ul>
  </div>
</template>

<script>
import eventBus from '../assets/utils/EventBus.js'
export default {
  name: 'pager',
  props: ['pageSize', 'data'],
  data: function () {
    return {
      firstHidden: false,
      prevHidden: false,
      nextHidden: false,
      lastHidden: false,

      pageNumber: 1,
      dataLength: 0
    }
  },
  methods: {
    first: function () {
      this.pageNumber = 1
      this.notifyPageChanged()
    },
    prev: function () {
      this.pageNumber--
      this.notifyPageChanged()
    },
    next: function () {
      this.pageNumber++
      this.notifyPageChanged()
    },
    last: function () {
      let maxPage = Math.ceil(this.dataLength / this.pageSize)
      this.pageNumber = maxPage
      this.notifyPageChanged()
    },
    notifyPageChanged: function () {
      this.redraw(this.dataLength)
      eventBus.$emit('pageChanged', {
        pageNumber: this.pageNumber
      })
    },
    redraw: function (newLength) {
      if (this.dataLength !== newLength) {
        this.pageNumber = 1
      }

      this.dataLength = newLength
      let maxPage = Math.ceil(newLength / this.pageSize)

      this.firstHidden = this.pageNumber === 1
      this.prevHidden = this.pageNumber === 1
      this.nextHidden = this.pageNumber === maxPage
      this.lastHidden = this.pageNumber === maxPage
    }
  },
  created: function () {
    this.redraw(this.data.length)
    eventBus.$on('dataChanged', args => {
      this.redraw(args.newLength)
    })
  }
}
</script>
<style>
  .pager{
    padding:0;
  }

  .pager li{
    display: inline-block;
    margin-right:10px;
  }

  .pager .pager-link-hidden{
    visibility:hidden;
  }
  a {
    text-decoration: none;
    display: inline-block;
    padding: 8px 16px;
  }

  a:hover {
    background-color: #ddd;
    color: black;
  }

  .previous {
    background-color: #f1f1f1;
    color: black;
  }

  .next {
    background-color: #4CAF50;
    color: white;
  }

  .round {
    border-radius: 50%;
  }
</style>
