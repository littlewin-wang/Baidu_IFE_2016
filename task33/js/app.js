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

function itemMove() {
  var inputs = document.getElementById("input").value;
  var cmd = inputs.toLocaleUpperCase();
  console.log(cmd);
  switch(cmd) {
    case "GO":
      itemGo();
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
    default:
      console.log("Input error");
  }
}

function itemGo(){
  switch(itemNow.item.className){
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

setDirection(itemNow.item, direction[itemNow.Dir]);
goBtn.onclick = itemMove;
