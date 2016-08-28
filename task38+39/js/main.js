Vue.component('table-demo', {
  template: '#table-template',
  props: {
    data: Array,
    columns: Array,
    show: Boolean
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders,
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})

new Vue({
  el: '#app',
  data: {
    tableColumns: ['team', 'rank', 'score'],
    tableData: [
      { team: 'Fnatic', rank: 4, score: 145 },
      { team: 'Wings', rank: 1, score: 912 },
      { team: 'EG', rank: 3, score: 218 },
      { team: 'DC', rank: 2, score: 342 },
      { team: 'Ehome', rank: 5, score: 93 }
    ]
  }
})
