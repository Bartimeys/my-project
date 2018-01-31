<template>
  <td v-if="editMode">
    <input type="text" v-model="cellValue" v-on:blur="setEdit(false)" />
  </td>
  <td v-else>
    <span v-on:click="setEdit(true)">{{cellValue}}</span>
  </td>
</template>

<script>
export default {
  name: 'TableCell',
  data () {
    return {
      editMode: false
    }
  },
  props: ['cellValue'],
  methods: {
    setEdit: function (val) {
      this.editMode = val
      if (!val) {
        let numVal = this.cellValue ? parseInt(this.cellValue) : 0
        this.$emit('update:cellValue', numVal)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
