// 储存的是一个数组
// state表示它的状态，
// on：表示发布中 end：表示结束  rel：表示未发布
// title是问卷的标题
// timeStart是问卷的起始时间
// timeEnd是问卷的结束时间
// sub表示题目

// 吧数据存储到sessen里，然后再使用JSON.parse转换成对象。
if(!window.localStorage.yiiuWenjuanData){
    var data = [];
    function add(obj){
        data.push({
            "title":obj.title,
            "timeEnd":obj.timeEnd,
            "state":obj.state,
            "que":obj.que
        })
    }
    add({
        title:"js框架使用使用情况调查",
        timeEnd:"2016-5-30",
        state:"on",
        que:[
            {
                type: "checkbox",
                title: "你最常使用的框架或库是什么？",
                required: false,
                problem: [
                    {
                        title: "react",
                        num: 21
                    },
                    {
                        title: "vue",
                        num: 21
                    },
                    {
                        title: "jquery",
                        num: 40
                    },
                    {
                        title: "bootstrap",
                        num: 30
                    },
                    {
                        title: "angularjs",
                        num: 21
                    },
                ]
            },
            {
                type: "radio",
                title: "你觉得那个框架的学习难度最大？",
                required: false,
                problem: [
                    {
                        title: "react",
                        num: 25
                    },
                    {
                        title: "vue",
                        num: 23
                    },
                    {
                        title: "jquery",
                        num: 12
                    },
                    {
                        title: "bootstrap",
                        num: 10
                    },
                    {
                        title: "angularjs",
                        num: 30
                    },
                ]
            },
            {
                type: "textarea",
                title: "说出你喜欢的框架或者库的优点",
                required: false
            }
        ]
    })
    // 将数据以JSON字符串的方式添加到sessen里
    localStorage.setItem('yiiuWenjuanData', JSON.stringify(data));
}
// 再吧sessen里的数据转换成对象。
export default{
    out(){
        return JSON.parse(localStorage.getItem("yiiuWenjuanData"))
    },
    add(obj){
        let a = JSON.parse(localStorage.getItem('yiiuWenjuanData'));
        a.push(obj)
        localStorage.setItem('yiiuWenjuanData', JSON.stringify(a));
    },
    del(index){
        let a = JSON.parse(localStorage.getItem('yiiuWenjuanData'));
        a.splice(index,1);
        localStorage.setItem('yiiuWenjuanData', JSON.stringify(a));
    },
    update(index,data){
        let a = JSON.parse(localStorage.getItem('yiiuWenjuanData'));
        a.splice(index,1);
        a.splice(index,0,data);
        localStorage.setItem('yiiuWenjuanData', JSON.stringify(a));
    }
}