import Vue from 'vue'
import BasicComponent from '@/components/BasicComponent'

describe('BasicComponent.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(BasicComponent)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('div#demo').textContent)
      .to.equal('Search')
  })
})
