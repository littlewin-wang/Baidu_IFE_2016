(function() {
  var table = document.getElementById("itemTable").children[0];
  var goBtn = document.getElementById("go");

  var direction = ["Top","Right","Bottom","Left"];

  var itemNow = {
    item: getItem(5,5),
    Dir: 1,
    X: 5,
    Y: 5,
  }

  function getItem(x, y){
    return table.childNodes.item(y*2).childNodes.item(x*2+1);
  }

  function setDirection(item, D){
    item.className = D;
  }

  function itemSetter(item){
    setDirection(item, direction[itemNow.Dir]);
    setDirection(itemNow.item,"");
    itemNow.item = item;
  }

  function calDirection(x){
      var d = (itemNow.Dir + x >= 0 ? itemNow.Dir + x : 3) % 4;
      itemNow.Dir = d;
      setDirection(itemNow.item, direction[d]);
  }

  function itemGo(dir){
    switch(dir){
      case "Left":
        if(itemNow.X > 1){
          itemNow.X--;
          var item = getItem(itemNow.X, itemNow.Y);
          itemSetter(item);
        }
        break;
      case "Top":
        if(itemNow.Y > 1){
          itemNow.Y--;
          var item = getItem(itemNow.X, itemNow.Y);
          itemSetter(item);
        }
        break;
      case "Right":
        if(itemNow.X < 10){
          itemNow.X++;
          var item = getItem(itemNow.X, itemNow.Y);
          itemSetter(item);
        }
        break;
      case "Bottom":
        if(itemNow.Y < 10){
          itemNow.Y++;
          var item = getItem(itemNow.X, itemNow.Y);
          itemSetter(item);
        }
        break;
    }
  }

  function itemMove(inputs) {
    var cmd = inputs.toLocaleUpperCase();
    console.log(cmd);
    switch(cmd) {
      case "GO":
        itemGo(itemNow.item.className);
        break;
      case "TUN LEF":
        calDirection(-1);
        break;
      case "TUN RIG":
        calDirection(1);
        break;
      case "TUN BAC":
        calDirection(2);
        break;
      case "TRA LEF":
        itemGo("Left");
        break;
      case "TRA TOP":
        itemGo("Top");
        break;
      case "TRA RIG":
        itemGo("Right");
        break;
      case "TRA BOT":
        itemGo("Bottom");
        break;
      case "MOV LEF":
        setDirection(itemNow.item,"Left");
        itemNow.Dir = 3;
        itemGo(itemNow.item.className);
        break;
      case "MOV TOP":
        setDirection(itemNow.item,"Top");
        itemNow.Dir = 0;
        itemGo(itemNow.item.className);
        break;
      case "MOV RIG":
        setDirection(itemNow.item,"Right");
        itemNow.Dir = 1;
        itemGo(itemNow.item.className);
        break;
      case "MOV BOT":
        setDirection(itemNow.item,"Bottom");
        itemNow.Dir = 2;
        itemGo(itemNow.item.className);
        break;
      default:
        console.log("Input error");
    }
  }

  setDirection(itemNow.item, direction[itemNow.Dir]);

  var inputs = document.getElementById("cmd-area");
  var rstBtn = document.getElementById("reset");
  var rowId = document.getElementById("row-id");
  
  inputs.addEventListener('keyup', function() {
    rowHasChange();
  });

  inputs.addEventListener('scroll', function() {
    var top = inputs.scrollTop;
    rowId.scrollTop = top;
  })

  function rowHasChange() {
    var value = inputs.value;
    var rows = value.split("\n");
    var arr = [];
    var top = inputs.scrollTop;
    for (var i = 0; i < rows.length; i++) {
      arr.push("<div class='error'>" + (i + 1) + "</div>");
    }
    rowId.innerHTML = arr.join("");
    rowId.scrollTop = top;
  }

  rstBtn.addEventListener("click", function(){
    inputs.value="";
    rowId.innerHTML = ""
  })

  goBtn.addEventListener('click', cmdCheck);

  function cmdCheck() {
    var value = inputs.value;
    var arr = value.split("\n");
    var i = 1;
    command(arr[0], 0);
    var timer = setInterval(function(){
      if(i<arr.length){
        command(arr[i], i);
        ++i;
      } else {
        clearInterval(timer)
      }
    }, 500)
  }

  function command(cmd, i) {
    var arr = cmd.split(" ");
    var steps = arr[arr.length-1];
    if(!isNaN(steps)){ //最后一位是数字
      arr.pop();
      var currentCmd = arr.join(" ");
    } else {
      var currentCmd = arr.join(" ");
      steps = 1;
    }

    for(var n = 0; n < steps; n++) {
      itemMove(currentCmd);
    }
  }

})()
