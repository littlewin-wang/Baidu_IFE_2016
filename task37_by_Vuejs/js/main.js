Vue.component('modal', {
  template: '#modal-template',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    notify: function() {
      this.$emit('toggle')
    }
  }
})

new Vue({
  el: '#app',
  data: {
    showModal: false
  },
  methods: {
    closeModal() {
      this.showModal = false
    }
  }
})
