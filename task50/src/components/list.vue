<template>
    <div  transition="gui">
        <div class="panel panel-default">
            <div class="panel-heading">问卷</div>
            <table class="table">
                <thead>
                    <tr>
                        <th><input type="checkbox"></th>
                        <th>标题</th>
                        <th>截止日期</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="test in item">
                        <th><input type="checkbox" name="question"></th>
                        <th>{{test.title}}</th>
                        <th>{{test.timeEnd}}</th>
                        <th v-if="test.state=='on'">
                        已发布</th>
                        <th v-if="test.state=='rel'" class="re">
                        未发布</th>
                        <th v-if="test.state=='end'" class="end">
                        结束</th>
                        <th>
                            <a v-link="{name:'edit',params:{id:$index}}" v-if="test.state == 'rel'">编辑</a>
                            <a @click="btndel($index)">删除</a>
                            <a v-link="{name:'see',params:{id:$index}}" v-if="test.state=='rel' || test.state=='on'">查看问卷</a>
                            <a v-link="{name:'stati',params:{id:$index}}" v-if="test.state=='end'  || test.state=='on'">查看数据</a>
                        </th>
                    </tr>
                </tbody>
            </table>
            <pop :on.sync="btn" :war="warning" :confirm="del" :single="true"></pop>
        </div>
    </div>
</template>
<script>
import data from "../data";
import see from "./see";
import pop from "./pops";

export default{
    data(){
        return{
            item:[],
            btn:false,
            warning:"",
            index: 0,
        }
    },
    methods:{
        btndel:function(indexs){
            this.index = indexs;
            this.btn = true;
            this.warning = "是否要删除";
        },
        del:function(){
            data.del(this.index);
            this.item = data.out()
        }
    },
    ready:function(){
        this.item = data.out()
    },
    components:{
        pop
    }
}
</script>
<style>
.panel .table tbody tr {
    transition: all .3s ease;
}
.panel .table tbody tr:hover{
    background: #ddd;
}
.panel .re{
    color: #4CAF50;
}
.panel .end{
    color: #E81818;
}
.panel a{
    cursor:pointer;
}
</style>