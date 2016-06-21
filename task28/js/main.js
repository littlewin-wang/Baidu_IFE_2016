var scene=document.getElementById('scene');
var control=document.getElementById('control');
var createbtn=document.getElementById('btn');
var power=document.getElementsByName('power');
var oEnergy=document.getElementsByName('energy');
var oLog=document.getElementById('log');
var oTab=document.getElementById('table');
var ships=[];
var powersystem=[{name:"前进号",speed:30,expendspeed:5},{name:"奔腾号",speed:50,expendspeed:7},{name:"超越号",speed:80,expendspeed:9}];
var energysystem=[{name:"劲量型",recoverspeed:2},{name:"光能型",recoverspeed:3},{name:"永久型",recoverspeed:4}];
var protoship={
  energy:100,
  state:"paused",
  destroy:0,
  adapter:function (signal) {//指令接收器
    if (typeof signal=="string") {
      var re =/\d{4}/g;
      var signs=signal.match(re);
      var sign_e={
        id:1,
        destroy:0,
        state:"paused"
      };
      var str;
      sign_e.id=parseInt(signs[0]);
      if (signs[1]=="1100") {
        sign_e.destroy=1;
        str="自我销毁";
      } else if(signs[1]=="0001"){
        sign_e.state="running";
        str="开始飞行";
      }else{
        sign_e.state="paused";
        str="停止飞行";
      }
      if (sign_e.id==this.id) {
          this.state=sign_e.state;
          if (sign_e.destroy) {
            this.destroy=sign_e.destroy;
          }
          this.cpu();
          oLog.innerHTML+="<p style='color:green;margin:0;'>"+sign_e.id+"号飞船收到命令，"+str+"</p>";
      }
    } else {
      var sign="000"+signal.id;
      if (signal.state=="paused"){
        sign+="0010";
      } else if(signal.state=="running"){
        sign+="0001";
      }else{
        sign+="1100";
      }
      var en=[];
      var de=signal.energy;
      do{
        en.push(de%2);
        de=Math.floor(de/2);
        
      }while(de>0);//能耗转换为二进制
      if (en.length<8) {
        for (var i = en.length; i < 8 ; i++) {
          en.push(0);
        }
      };//补零
      for (var i = en.length - 1; i >= 0; i--) {
        sign+=String(en[i]);
      }
      
      return sign;
    }
    
  },
  cpu:function () {//指令处理器
    scene.getElementsByTagName('div')[this.id].style.animationPlayState=this.state;
    if (this.destroy==1) {
      scene.getElementsByTagName('div')[this.id].style.display="none";
      
      clearInterval(this.int1);
      clearInterval(this.int2);
    }
  },
  broadcast:function () {//广播系统
    var that=this;
    var ing =setInterval(function () {
      var signal={
      id:that.id,
      state:that.state,
      energy:that.energy
      }
      if (that.destroy==1) {
        signal.state="即将销毁";
      }
      var sin=that.adapter(signal);
      BUS(sin);
    },1000);
  }
}
var ship=function () {
  this.id=scene.getElementsByTagName('div').length;
  var str="";
  var td2_text="";
  var td3_text="";
  for (var i = 0; i < power.length; i++) {
    if(power[i].checked==true)
    {
      this.speed=powersystem[i].speed;
      this.expendspeed=powersystem[i].expendspeed;
      str=str+"新建“"+powersystem[i].name+"”飞船，";
      td2_text=powersystem[i].name;
    }
  }
  for (var i = 0; i < oEnergy.length; i++) {
    if(oEnergy[i].checked==true)
    {
      this.recoverspeed=energysystem[i].recoverspeed;
      str=str+"采用"+energysystem[i].name+"能源系统";
      td3_text=energysystem[i].name;
    }
  }
  oLog.innerHTML+="<p style='color:green;margin:0;'>"+str+'</p>';
  var that=this;
  var PI=Math.PI;
  function createship() {
    var ship_element=document.createElement('div');
    ship_element.className="ship";
    scene.appendChild(ship_element);
    ship_element.style.animationDuration=(400*PI)/that.speed+"s";
  };
  function createcontrol(argument) {
    var textnode1=document.createTextNode("对"+that.id+"号飞船下达命令:");
    var textnode2=document.createTextNode("开始飞行");
    var textnode3=document.createTextNode("停止飞行");
    var textnode4=document.createTextNode("销毁");
    var control_element=document.createElement('div');
    control_element.className="shipcontrol"+that.id;
    control.appendChild(control_element);
    var label_element=document.createElement('label');
    label_element.appendChild(textnode1);
    control_element.appendChild(label_element);
    var button_element1=document.createElement('button');
    button_element1.className="btn1";
    button_element1.appendChild(textnode2);
    control_element.appendChild(button_element1);
    var button_element2=document.createElement('button');
    button_element2.className="btn2";
    button_element2.appendChild(textnode3);
    control_element.appendChild(button_element2);
    var button_element3=document.createElement('button');
    button_element3.className="btn3";
    button_element3.appendChild(textnode4);
    control_element.appendChild(button_element3);
    var trele=document.createElement('tr');
    var td1=document.createElement('td');
    td1.innerHTML=that.id+"号";
    var td2=document.createElement('td');
    td2.innerHTML=td2_text;
    var td3=document.createElement('td');
    td3.innerHTML=td3_text;
    var td4=document.createElement('td');
    td4.innerHTML="等待中";
    var td5=document.createElement('td');
    td5.innerHTML="100%";
    oTab.appendChild(trele);
    trele.appendChild(td1);
    trele.appendChild(td2);
    trele.appendChild(td3);
    trele.appendChild(td4);
    trele.appendChild(td5);
  }
  
  this.expend=function () {
    //能源消耗
    if (that.state=="running") {
      if (that.energy<that.expendspeed) {
        that.state="paused";
        that.cpu();
        oLog.innerHTML+=that.id+"号飞船能源耗尽，停止飞行<br>"
      }else{
        that.energy-=that.expendspeed;
      }
      
    }
  };
  this.recover=function () {
    //能源恢复
    if (that.energy<100) {
      if (that.energy>100-that.recoverspeed) {
        that.energy=100;
      }else{
        that.energy+=that.recoverspeed;
      }
      
    }
    scene.getElementsByTagName('div')[that.id].innerHTML=that.id+"号-"+that.energy+"%";
  };
  this.int1=setInterval(this.expend,1000);
  this.int2=setInterval(this.recover,1000);
  createship();
  createcontrol();
}
ship.prototype=protoship;

var num=0;//飞船数量，起始为0
//signal
var signal=function (id,argument) {
  this.id=id;
  if (argument==0||argument==1) {
    this.destroy=argument;
  }else{
    this.state=argument;
  }
}
//Adapter
var Adapter=function (sign) {
  var binary
  if (typeof sign=="string") {
    var re =/\d{4}/g;
    var signs=sign.match(re);
    binary={
      id:parseInt(signs[0]),
      state:"等待中",
      energy:0
    }
  
    if (signs[1]=="0010") {
      binary.state="等待中";
    }else if(signs[1]=="0001"){
      binary.state="飞行中";
    }else{
      binary.state="即将销毁";
    }
    var energyl=signs[2].concat(signs[3]);
    for (var i = 0; i < energyl.length; i++) {
      binary.energy+=parseInt(energyl[i])*Math.pow(2,7-i);
    }
  } else {
    binary="000"+sign.id;
    if (sign.destroy) {
      binary+="1100";
    }else{
      if (sign.state=="running") {
        binary+="0001";
      }else{
        binary+="0010";
      }
    }
  }
  
  return binary;
}
//BUS
var BUS=function (sign) {
  var me=Math.random()*100;//模拟10%丢包率
  var n=0;
  while(me<10){
    n++;
    if (/^\d{8}$/g.test(sign)) {
      oLog.innerHTML+="传播失败，继续尝试"+n+"次<br>"
    }else{
      oLog.innerHTML+="<p style='color:red;margin:0;'>行星接收广播信号失败，继续尝试"+n+"次</p>"
    }
    me=Math.random()*100;
  }
  if (/^\d{8}$/g.test(sign)) {
    oLog.innerHTML+="<p style='color:blue;margin:0;'>向飞船发送命令成功</p>";
    setTimeout(function () {
        for (var i = 0; i < ships.length; i++) {
          ships[i].adapter(sign);
        }
    },300);
  }else{
    oLog.innerHTML+="<p style='color:blue;margin:0;'>行星接收广播信号成功</p>";
    setTimeout(function () {
      excepter(sign);
    },300);
  } 
}
//行星接收器
var excepter=function (sign) {
  DC(sign);
}
//数据处理中心
var DC=function (sign) {
  var sign_l=Adapter(sign);
  var id=sign_l.id;
  var oTr=oTab.getElementsByTagName('tr')[id];
  oTr.getElementsByTagName('td')[3].innerHTML=sign_l.state;
  oTr.getElementsByTagName('td')[4].innerHTML=sign_l.energy+"%";
}
//新建飞船
createbtn.onclick=function (argument) {
  if (num<4) {
    ships.push(new ship());
    num+=1;
  }
  ships[ships.length-1].broadcast();
  
  controlf();
}
//control
function controlf(argument) {
  var controls=control.getElementsByTagName('div');
  for (var i = 1; i < controls.length; i++) {
    (function (a) {
      var buttons=controls[a].getElementsByTagName('button');
      buttons[0].onclick=function () {
        var sig=new signal(a,"running");
        BUS(Adapter(sig));
      }
      buttons[1].onclick=function () {
        var sig=new signal(a,"paused");
        BUS(Adapter(sig));
      }
      buttons[2].onclick=function () {
        var sig=new signal(a,1);
        BUS(Adapter(sig));
        control.getElementsByTagName('div')[a].style.display="none";
        num-=1;
      }
    })(i)
    
  }
}
controlf();