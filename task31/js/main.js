function g(id){
  return document.getElementById(id)
}
var check = g('yes');
var nocheck = g('no');
var sc = g('sc');
var work = g('work');
var citySelect = g('city-select');
var schoolSelect = g('school-select');

var list = [  //数组容器，存放城市，以及学校
  {text:'北京',
      val:[
        '北京大学',
        '清华大学',
        '北京理工大学',
        '北京邮电大学',
        '中央财经大学'
      ]},
  {text:'天津',
      val:[
        '天津大学',
        '南开大学',
        '天津理工大学',
        '天津商业大学',
        '天津财经大学'
      ]},
  {text:'上海',
      val:[
        '复旦大学',
        '上海大学',
        '上海理工大学',
        '上海海洋大学',
        '上海财经大学'
      ]},
  {text:'成都',
      val:[
        '成都大学',
        '西南大学',
        '成都理工大学',
        '成都科技大学',
        '西南财经大学',
        '西华大学'
      ]}

]
/*单选框*/
check.onclick = function(){
  if(check.checked){
    work.style.display = "none";
    sc.style.display = "block";
  }
}
nocheck.onclick = function(){
  if(nocheck.checked){
    sc.style.display="none";
    work.style.display = "block";
  }
}
/*联动菜单*/
function selected(){  //第一级联动菜单
  var arr = [];
  for(var i = 0;i<list.length;i++){ //遍历list数组，创建出城市
    var option = document.createElement("option");
    option.innerHTML = list[i].text;  //设置option的值
    option.value = list[i].text;  
    citySelect.appendChild(option);   
  }

}
function selectedTwo(){   //第二级联动菜单
  schoolSelect.innerHTML="";    //清空html
  for(var i = 1;i<=list.length;i++){    //遍历一级联动菜单
    if(citySelect.childNodes[i].selected){    //判断：如果某一个元素被选中，
      for(var j=0;j<list[i-1].val.length;j++){    //那么：遍历这个list的val值
        var option = document.createElement("option");    //创建option
        option.innerHTML = list[i-1].val[j];        //设置option的值  （i-1 是因为chlidNodes是从1开始的）
        option.value = list[i-1].val[j];
        schoolSelect.appendChild(option);
      }
    }
  }
}
selected()  //运行一级菜单
selectedTwo() //运行一次二级联动菜单
citySelect.onclick = function(){  //点击再运行二级联动菜单
  selectedTwo()
}