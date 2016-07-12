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

  function itemGo(dir, action, color){
    switch(dir){
      case "Left":
        if(itemNow.X > 1) {
          var newX = itemNow.X - 1;
          var item = getItem(newX, itemNow.Y);
          if(action == "move") {
            if(item.className != "Wall") {
              itemNow.X--;
              itemSetter(item);
            } else {
              console.log("Can not go through wall");
            }
          } else if (action == "build") {
            item.className = "Wall";
          } else if (action == "bru") {
            if(item.className == "Wall") {
              item.style.backgroundColor = color;
            } else {
              console.log("Not Wall");
            }
          } else {
            console.log("Action illegal");
          }   
        }
        break;
      case "Top":
        if(itemNow.Y > 1) {
          var newY = itemNow.Y - 1;
          var item = getItem(itemNow.X, newY);
          if(action == "move") {
            if(item.className != "Wall") {
              itemNow.Y--;
              itemSetter(item);
            } else {
              console.log("Can not go through wall");
            }
          } else if (action == "build") {
            item.className = "Wall";
          } else if (action == "bru") {
            if(item.className == "Wall") {
              item.style.backgroundColor = color;
            } else {
              console.log("Not Wall");
            }
          } else {
            console.log("Action illegal")
          }
        }
        break;
      case "Right":
        if(itemNow.X < 10){
          var newX = itemNow.X + 1;
          var item = getItem(newX, itemNow.Y);
          if(action == "move") {
            if(item.className != "Wall") {
              itemNow.X++;
              itemSetter(item);
            } else {
              console.log("Can not go through wall");
            }
          } else if (action == "build") {
            item.className = "Wall";
          } else if (action == "bru") {
            if(item.className == "Wall") {
              item.style.backgroundColor = color;
            } else {
              console.log("Not Wall");
            }
          } else {
            console.log("Action illegal")
          }
        }
        break;
      case "Bottom":
        if(itemNow.Y < 10){
          var newY = itemNow.Y + 1;
          var item = getItem(itemNow.X, newY);
          if(action == "move") {
            if(item.className != "Wall") {
              itemNow.Y++;
              itemSetter(item);
            } else {
              console.log("Can not go through wall");
            }
          } else if (action == "build") {
            item.className = "Wall";
          } else if (action == "bru") {
            if(item.className == "Wall") {
              item.style.backgroundColor = color;
            } else {
              console.log("Not Wall");
            }
          } else {
            console.log("Action illegal")
          }
        }
        break;
    }
  }

  function itemMove(inputs) {
    var cmd = inputs.toLocaleUpperCase();
    console.log(cmd);
    switch(cmd) {
      case "GO":
        itemGo(itemNow.item.className, "move");
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
        itemGo("Left", "move");
        break;
      case "TRA TOP":
        itemGo("Top", "move");
        break;
      case "TRA RIG":
        itemGo("Right", "move");
        break;
      case "TRA BOT":
        itemGo("Bottom", "move");
        break;
      case "MOV LEF":
        setDirection(itemNow.item,"Left");
        itemNow.Dir = 3;
        itemGo(itemNow.item.className, "move");
        break;
      case "MOV TOP":
        setDirection(itemNow.item,"Top");
        itemNow.Dir = 0;
        itemGo(itemNow.item.className, "move");
        break;
      case "MOV RIG":
        setDirection(itemNow.item,"Right");
        itemNow.Dir = 1;
        itemGo(itemNow.item.className, "move");
        break;
      case "MOV BOT":
        setDirection(itemNow.item,"Bottom");
        itemNow.Dir = 2;
        itemGo(itemNow.item.className, "move");
        break;
      case "BUILD":
        itemGo(itemNow.item.className, "build");
        break;
      default:
        if(/^BRU /.test(cmd)) {
          var color = cmd.split(" ")[1];
          if(checkColor(color)) {
            itemGo(itemNow.item.className, "bru", color);
          } else {
            console.log("Input color error");
          }
        } else if (/^MOV TO /.test(cmd)) {
          var toX = cmd.split(" ")[2].split(",")[0];
          var toY = cmd.split(" ")[2].split(",")[1];
          goPath(toX, toY);
        } else {
          console.log("Input error");
        }
    }
  }

  function checkColor(color)
  {
    var pattern = /^#[0-9a-fA-F]{6}$/
    if(color.match(pattern) == null) {
      return false;
    } else {
      return true;
    }
  }

  function goPath(toX, toY) {
    var arr = [];
    for(var m = 1 ; m <= 10; m++) {
      arr[m-1] = [];
      for(var n = 1 ; n <= 10; n++) {
        if(getItem(n, m).className == "Wall"){
          arr[m-1][n-1] = 1;
        } else {
          arr[m-1][n-1] = 0;
        } 
      }
    }

    var map = Maze(arr);
    var parent = map.findPath(Point(itemNow.X, itemNow.Y), Point(toX, toY), false);
    if(parent) {
      var path = [];
      while (parent != null)
      {
        path.push(parent);
        parent = parent.parentPoint;
      }
      path.reverse();
      console.log(path);
    } else {
      console.log("Can not find a path");
    }
    delete map;
  }

  setDirection(itemNow.item, direction[itemNow.Dir]);

  var inputs = document.getElementById("cmd-area");
  var rstBtn = document.getElementById("reset");
  var rowId = document.getElementById("row-id");
  var randBtn = document.getElementById("rand");
  
  inputs.addEventListener('keyup', function() {
    rowHasChange();
  });

  inputs.addEventListener('scroll', function() {
    var top = inputs.scrollTop;
    rowId.scrollTop = top;
  })

  function random(min, max) {
    var range = max - min;
    var rand = Math.random();
    return(min + Math.round(rand*range))
  }

  function randomWall() {
    var randX = random(1,10);
    var randY = random(1,10);
    if(!((randX == itemNow.X)&&(randY == itemNow.Y))){
      if(getItem(randX, randY).className != "Wall") {
        getItem(randX, randY).className = "Wall";
      }
    } else {
      console.log("This position is hold by Item.")
    }
  }

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

  randBtn.addEventListener('click', randomWall);

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
    }, 1000)
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

    var n = 0;
    var actions = setInterval(function() {
      if(n < steps) {
        itemMove(currentCmd);
        ++n;
      } else {
        clearInterval(actions);
      }
    }, 500)
  }
})()
