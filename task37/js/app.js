(function() {
  var login_btn = document.getElementById('login');
  var pop_box = document.getElementById('pop_box');
  var close_btn = document.getElementById('close');
  var mask = document.getElementById('mask');

  //获取屏幕高度
  var windowSize = {
    width: document.documentElement.offsetWidth
        || document.documentElement.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }

  //事件绑定函数，其中eventType为不含"on"的事件类型
  function bind(ele, eventType, callback) {
    if(ele.addEventListener) {
      // W3C标准写法
      return ele.addEventListener(eventType, callback, false);
    }else if(ele.attachEvent) {
      // 兼容IE6~8
      return ele.attachEvent("on" + eventType, callback);
    }else {
      // 兼容IE5-
      return ele["on" + eventType] = callback;
    }
  }

  // 给login_btn绑定打开浮动层的事件
  bind(login_btn, "click", boxShow);

  // 给mask和close_button绑定关闭浮动层的事件
  // bind(mask, "click", closeBox);
  bind(close_btn, "click", closeBox);

  // 弹出弹出框
  function boxShow() {
    pop_box.style.display = "block";
    mask.style.display = "block";
  }

  // 关闭弹出框
  function closeBox() {
    pop_box.style.display = "none";
    mask.style.display = "none";
  }

  // 浮动层的移动事件绑定
  bind(pop_box, "mousedown", popDown);
  bind(pop_box, "mousemove", popMove);
  bind(pop_box, "mouseup", popUp);

  // isDown表示鼠标是否已按下，默认为未按下状态
  var isDown = false;
  // 鼠标位置与浮动层左上角的距离
  var deltaX, deltaY;
  // 浮动层的margin值
  var marginX, marginY;
  // 声明浮动层移动的边界值
  var edgeLeft, edgeTop;
  // 声明鼠标当前坐标
  var mouseX, mouseY;
  // 浮动层元素左上角的真实left和top值
  var popUpBoxLeft, popUpBoxTop;

  // 浮动层的鼠标按下事件
  function popDown(e) {
    // 修改拖动样式
    pop_box.style.cursor = "move";

    // 获取当前鼠标位置坐标
    var e = e || window.event;
    var mouse = getPosition(e);
    mouseX = mouse[0];
    mouseY = mouse[1];

    // 获取浮动层元素左上角的真实left和top值
    popUpBoxLeft = pop_box.offsetLeft - marginX;
    popUpBoxTop = pop_box.offsetTop - marginY;

    // 获取鼠标位置与浮动层左上角的距离
    deltaX = mouseX - popUpBoxLeft;
    deltaY = mouseY - popUpBoxTop;

    // 浮动层的margin值
    marginX = -pop_box.offsetWidth/2;
    marginY = -pop_box.offsetHeight/2;

    // 确认鼠标是否按下
    isDown = true;
  }

  // 浮动层的鼠标移动事件
  function popMove(e) {
    // 获取当前鼠标位置坐标
    var e = e || window.event;
    var mouse = getPosition(e);
    mouseX = mouse[0];
    mouseY = mouse[1];

    // 当鼠标已经按下，触发鼠标移动事件
    if(isDown) {
      // 浮动层移动边界判断
      edgeLeft = mouseX - deltaX;
      edgeTop = mouseY - deltaY;
      if((edgeLeft >= -marginX) && (edgeLeft < windowSize.width - pop_box.offsetWidth - marginX)) {
        pop_box.style.left = edgeLeft + "px";
      }
      if((edgeTop >= -marginY) && (edgeTop < windowSize.height - pop_box.offsetTop - marginY)){
        pop_box.style.top = edgeTop + "px";
      }
    }
  }

  // 浮动层的鼠标释放事件
  function popUp(e) {
    pop_box.style.cursor = "default";
    isDown = false;
  }

  // 获取鼠标当前位置
  function getPosition(e) {
    // 访问事件对象
    var e = e || window.event;

    // 声明x、y分别为鼠标相对于文档的位置
    var x = 0, y = 0;

    // 针对W3C标准浏览器具有pageX/Y属性
    if(e.pageX) {
      x = e.pageX;
      y = e.pageY;
    }else if(e.clientX) {
      // 在IE6~8中不支持pageX，而是用clientX；但clientX只是相对屏幕视口的横坐标，不包含滚动宽度；
      var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // pageX = clientX + scrollX
      x = e.clientX + scrollLeft;
      y = e.clientY + scrollTop;
    }
    return [x, y];
  }

})()
