### 要求

[任务三十八：UI组件之排序表格](http://ife.baidu.com/task/detail?taskId=38)

[任务三十九：UI组件之冻结行列表格](http://ife.baidu.com/task/detail?taskId=39)

### 实现（Vue.js）

最近一直在练习使用Vue.js，Vue轻量但功能齐全。

表格组件有排序和冻结行列要求，其中，排序功能在Vue中有自带的`orderBy`方法：

    <ul>
    <li v-for="user in users | orderBy 'name' -1">
      {{ user.name }}
    </li>
    </ul>
    
    //orderBy操作数组, 以'name'为索引, -1表示降序

冻结行列要求自己调试N久，还是无法再组件模板里实现，所以考虑之后还是在外部写js实现了，具体思路就是在`window`的`scroll`事件中计算表格相对于网页可视区域的位置，在表头离开可视区域而表格未完全离开时，显示一个`fixed`定位的表头。

    window.onscroll = function() {
      var headerPos = document.getElementById('table-header').getBoundingClientRect();
      var tablePos = document.getElementById('table-all').getBoundingClientRect();
      if((headerPos.top < -headerPos.height) && (headerPos.top > -tablePos.height)) {
        document.getElementById('frozen-header').style.display = 'block'
      } else {
        document.getElementById('frozen-header').style.display = 'none'
      }
    }

这里关于网页元素定位请参考[用Javascript获取页面元素的位置](http://www.ruanyifeng.com/blog/2009/09/find_element_s_position_using_javascript.html)，上面代码调用了getBoundingClientRect()函数。

其他的代码实现都很简单了，就不一一阐述了
