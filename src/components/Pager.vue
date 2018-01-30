<template>
  <div>
    <ul class="pager">
      <li :class="{'pager-link-hidden' : firstHidden}"><a class="first" href="#" v-on:click="first">&lt;&lt;</a></li>
      <li :class="{'pager-link-hidden' : prevHidden}"><a class="prev" href="#" v-on:click="prev">&lt;</a></li>
      <li>{{pageNumber}}</li>
      <li :class="{'pager-link-hidden' : nextHidden}"><a class="next" href="#" v-on:click="next">&gt;</a></li>
      <li :class="{'pager-link-hidden' :  lastHidden}"><a class="last" href="#" v-on:click="last">&gt;&gt;</a></li>
    </ul>
  </div>
</template>

<script>
import eventBus from './EventBus.js'
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
</style>
