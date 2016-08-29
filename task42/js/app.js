(function(window) {
  //按照Date-Picker格式输出当前年、月对应的数据源
  function getCalendar(year, month) {
    year = parseInt(year)
    month = parseInt(month)
    var time = new Date(year, month-1, 1)

    var lastDate,
        nextDate
    var lastMonth = month - 1
    var nextMonth = month + 1
    if(month == 1) {
      lastDate = "" + (year - 1) + '-' + + 12 + '-'
      nextDate = "" + year + '-' + 2 + '-'
      lastMonth = 12
    } else if(month == 12) {
      lastDate = "" + year + '-' + 11 + '-'
      nextDate = "" + (year + 1) + '-' + 1 + '-'
      nextMonth = 1
    } else {
      lastDate = "" + year + '-' + (month - 1) + '-'
      nextDate = "" + year + '-' + (month + 1) + '-'
    }
    //设置容器size
    var maxNumber = 42
    var r1 = [],
        r2 = [],
        r3 = []
    var lastFix = time.getDay() - 1
    lastFix = lastFix < 0 ? lastFix + 7 : lastFix
    //上个月份最大天数
    var lastMaxDate = new Date(year, month-1, 0).getDate() 
    //当前月份的
    var maxDate = new Date(year, month, 0).getDate()
    
    var i,t
    //处理上个月的数据
    for (i = 0; i < lastFix; i++) {
      t = lastMaxDate - lastFix + i + 1
      r1[i] = {month: lastMonth, day: t, data: lastDate + t}
    }
    //处理本月数据
    for (i = 0; i < maxDate; i++) {
      t = i + 1
      r2[i] = {month: month, day: t, data: "" + year + '-' + + month + '-' + t}
    }
    //处理下个月数据
    var nextFix = maxNumber - maxDate - lastFix
    for (i = 0; i < nextFix; i++) {
      t = i + 1
      r3[i] = {month: nextMonth, day: t, data: nextDate + t}
    }

    //以周为单位，输出数组
    var result = r1.concat(r2, r3)
    var weeks = []
    for(i = 0; i < 6; i++){
      weeks.push(result.splice(0, 7))
    }
    return weeks
  }

  var calendarLine = Vue.extend({
    props:['items', 'cur', 'sel', 'month'],
    data(){
      return {}
    },
    template: `
      <tr>
        <td v-for="item in items" v-bind:class="{'dp-last': month!= item.month, 'dp-today': cur == item.data, 'dp-select': sel == item.data}">
          <span @click="click(item)">{{ item.day }}</span>
        </td>
      </tr>
    `,
    methods: {
      click(item){
        this.$dispatch('click', item.data)
      }
    }
  })

  var calendar = Vue.extend({
    props:['date'],
    data() {

      var d = ''  //用于显示的日历
      var len = ('' + this.date).length
      
      if(!this.date || (len != 13 && len != 10)) {
        //为空
        d = new Date()
      } else {
        d = len == 13 ? new Date(parseInt(this.date)):new Date(this.date*1000)
      }
      
      var sel = ''
      
      if ( Object.prototype.toString.call(d) === "[object Date]" ) {
        // it is a date
        if ( isNaN( d.getTime() ) ) {  // d.valueOf() could also work
          // date is not valid
          d = new Date()
        }
        else {
          // date is valid
          sel = d.getFullYear()+ '-' +(d.getMonth()+1) + '-' + d.getDate()
        }
      }
      else {
        // not a date
        d = new Date()
      }
      
      if(!this.date) {
        sel = ''
      }
  
      var curTime = new Date()
      var cur = "" + curTime.getFullYear() + '-' + (curTime.getMonth()+1) + '-' + curTime.getDate() //当前日期
      var y = d.getFullYear()
      var m = d.getMonth() + 1
      var data = getCalendar(d.getFullYear(), d.getMonth()+1)  //显示的日历
      return {
        cur: cur,
        sel: sel,
        y: y,
        m: m,
        data: data,
        show: false
      }
    },
    template: `
      <div class="input-wrap">
        <input type="text" class="input middle-input" @focus="foc" v-model="sel">
      </div>
      <div class="dp" v-show="show">
        <div class="dp-header"><a class="dp-h-1" @click="cy(-1)">«</a><a class="dp-h-2" @click="cm(-1)">‹</a>
        <span class="dp-ym">{{y}}年 {{m}}月</span>
        <a class="dp-h-3" @click="cm(1)">›</a><a class="dp-h-4" @click="cy(1)">»</a></div>
        <table class="dp-table">
        <thead>
          <tr>
            <th><span>一</span></th>
            <th><span>二</span></th>
            <th><span>三</span></th>
            <th><span>四</span></th>
            <th><span>五</span></th>
            <th><span>六</span></th>
            <th><span>日</span></th>
          </tr>
        </thead>
        <tbody>
          <tr is="calendar-line" v-for="cell in data" :items="cell" :month="m" :cur="cur" :sel="sel"></tr>
        </tbody>
        </table>
        <div class="dp-footer"><a @click="clickNow">{{sel}}</a>  <span class="btn btn-ok" @click="show=false">确定</span></div>
      </div>
    `,
    methods: {
      cm(flag) {
        //前进后退月
        if(flag == -1) {
          if(this.m == 1){
            this.$emit('init', parseInt(this.y) - 1,12)
          } else {
            this.$emit('init', this.y, parseInt(this.m)-1)
          }
        } else {
          if(this.m == 12){
            this.$emit('init', parseInt(this.y) + 1,1)
          }else {
            this.$emit('init', this.y, parseInt(this.m)+1)
          }
        }
      },
      cy(flag) {
          //前进后退年
          if(flag == -1) {
            this.$emit('init', parseInt(this.y) -1,this.m)
          } else {
            this.$emit('init', parseInt(this.y) +1,this.m)
          }
      },
      clickNow(){
        var t = new Date()
        var y = t.getFullYear()
        var m = t.getMonth()+1
        var d = t.getDate()
        this.$emit('init', y, m)
      },
      foc(){
        this.show = true
      }
    },
    events:{
      init(y, m){
        //切换日历
        this.data = getCalendar(y, m)
        this.y = y
        this.m = m;
      },
      click(data){
        //点击事件
        this.sel = data
        var ar = data.split('-')
        var m = ar[1]
        var y = ar[0]
        this.date = new Date(ar[0],ar[1]-1,ar[2]).getTime()   //更新时间
        if(m == this.m) {
        } else {
          this.y = y
          this.m = m
          this.data = getCalendar(y, m)
        }
      }
    },
    components:{
      'calendar-line': calendarLine
    }
  })

  window.components = window.components || {}
  window.components.calendar = calendar
})(window)