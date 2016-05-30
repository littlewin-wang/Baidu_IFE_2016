/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
              '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var chartDiv = document.getElementsByClassName('aqi-chart-wrap')[0];
  var color, text = "";

  for(i in chartData) {
    color = colors[Math.ceil(Math.random()*11)];
    text += '<div title="'+i+"\n"+chartData[i]+'" style="height:'+chartData[i]+'px; background-color:'+color+'"></div>';
  }

  chartDiv.innerHTML = text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
  var graTimeRadio = document.getElementsByName("gra-time");
  for(var i = 0; i < graTimeRadio.length; i++) {
    if(graTimeRadio[i].checked) {
      if(pageState.nowGraTime == graTimeRadio[i].value) {
        return;
      } else {
        pageState.nowGraTime = graTimeRadio[i].value;
      }
    }
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var citySelect = document.getElementById("city-select");
  var citySelected = citySelect.options[citySelect.selectedIndex].text;
  if(citySelected == pageState.nowSelectCity) {
    return; 
  } else {
    pageState.nowSelectCity = citySelected;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var graTimeRadio = document.getElementsByName("gra-time");
  for(var i = 0; i < graTimeRadio.length; i++) {
    graTimeRadio[i].onclick = graTimeChange;
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById("city-select");
  citySelect.innerHTML = "";
  for(i in aqiSourceData) {
    citySelect.innerHTML += "<option>" + i + "</option>";
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.onchange = citySelectChange;
  pageState.nowSelectCity = citySelect.options[citySelect.selectedIndex].text;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var nowSelectCityData = aqiSourceData[pageState.nowSelectCity];
  chartData = {};
  switch(pageState.nowGraTime) {
    case "day":
      chartData = nowSelectCityData;
      break;

    case "week":
      var week = 1, sum = 0, count = 0;
      for(i in nowSelectCityData) {
        count++;
        sum += nowSelectCityData[i];
        if ((new Date(i)).getDay() == 6 ) {
          chartData["第"+week+"周"] = Math.floor(sum/count);
          count = 0;
          sum = 0;
          week++;
        }
      }
      if(count!=0) {
        chartData["第"+week+"周"] = Math.floor(sum/count);
      }
      break;

    case "month":
      var month = 0, sum = 0, count = 0;
      for(i in nowSelectCityData) {
        count++;
        sum += nowSelectCityData[i];
        if ((new Date(i)).getMonth() !== month ) {
          month++;
          chartData[month+"月"] = Math.floor(sum/count);
          count = 0;
          sum = 0;
        }
      }
      if(count!=0) {
        month++;
        chartData[month+"月"] = Math.floor(sum/count);
      }
      break;

    default:
      chartData = nowSelectCityData;
      break;
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();