<template>
    <div transition="gui" id="edit">
        <n_title :text.sync='data.title' :class="'edit-title'" :iclass="'form-control edit-title'"></n_title>
        <span>状态：未发布</span>
        <div class="content">
            <div class="questions" v-for="t in data.que">
                <question :index='$index+1' :que.sync="t"></question>
            </div>
            <div class="adds">
                <div class="btns"  v-show="n_add_ts"  transition="n_add_t">
                    <button type="button" class="btn btn-default btn-sm" @click="radio">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 
                        单选
                    </button>
                    <button type="button" class="btn btn-default btn-sm" @click="checkbox">
                        <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> 
                        多选
                    </button>
                    <button type="button" class="btn btn-default btn-sm" @click="textarea">
                        <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span> 
                        文本题
                    </button>
                </div>
                <div class="add" @click="n_add_t_c">+ 添加问题</div>
            </div>
        </div>
        <div class="footer">
            <date></date>
            <div class="btns">
                <button type="button" class="btn btn-default btn-sm" @click="update">保存问卷</button>
                <button type="button" class="btn btn-default btn-sm" @click="check">提交问卷</button>
            </div>
        </div>
        <pop :on.sync="btn" :war="warning"></pop>
    </div>
</template>
<script>
import datas from "../data.js";
import n_title from "./n_title";
import pop from "./pops";
import date from "./date";
import question from "./question";
    export default{
        data(){
            return {
                text:"请输入标题",
                n_add_ts : false,
                date:"",
                data:{},
                btn:false,
                warning:"!",
                index:0,
                legal:false 
            }
        },
        route:{
            data(){
                let _data = datas.out()
                this.index = this.$route.path.replace(/[^0-9]/ig,"")
                if(this.index>_data.length){
                    this.$route.router.go("/404")
                }else{
                    this.data  = _data[this.index]
                }
            }
        },
        methods:{
            n_add_t_c : function(){
                this.n_add_ts = true;
            },
            radio : function(){
                this.data.que.push({
                    "type":"radio",
                    "title":"请输入标题",
                    "required":false,
                    "problem":[]
                });
                this.n_add_ts = false;
            },
            checkbox : function(){
                this.data.que.push({
                    "type":"checkbox",
                    "title":"请输入标题",
                    "required":false,
                    "problem":[]
                });
                this.n_add_ts = false;
            },
            textarea : function(){
                this.data.que.push({
                    "type":"textarea",
                    "title":"请输入标题",
                    "required":false
                });
                this.n_add_ts = false;
            },
            // 验证
            check: function(){
                if(this.data.que.length == 0){
                    this.warning = "至少添加一个问题";
                    this.btn = true;
                    return false
                }else{
                    for(var i=0;i<this.data.que.length;i++){
                        if(this.data.que[i].title=="请输入标题" || this.data.que[i].title=="请重新填写"){
                            this.warning = "请输入问题"+(i+1)+ "的标题";
                            this.btn = true;
                            return false
                        }else if(this.data.que[i].problem){
                            if(this.data.que[i].problem.length <= 1){
                                this.warning = "每个问题至少2个选项";
                                this.btn = true;
                                return false
                            }else if(this.data.que[i].problem.length>=2){
                                for(var j = 0;j<this.data.que[i].problem.length;j++){
                                    if(this.data.que[i].problem[j] === "请重新填写"){
                                        this.warning = "请重新输入第"+(i+1)+"问题的第"+(j+1)+"个选项";
                                        this.btn = true;
                                        return false
                                    } 
                                }
                            }
                        }
                    }
                }
                this.data.state = "on";
                datas.update(this.index,this.data);
                this.$route.router.go("/list")
            },
            update:function(){
                datas.update(this.index,this.data);
                this.$route.router.go("/list")
            },
            submit:function(){
            },
            deep:function(index){
                var j = {},
                    p = [];
                j.title = this.data.que[index].title;
                j.type = this.data.que[index].type;
                j.require = false;
                for(var i=0;i<this.data.que[index].problem.length;i++){
                    p.push({"title":this.data.que[index].problem[i].title})
                }
                j.problem = p;
                return j
            }
        },
        events:{
            // 复用
            overlap:function(index){
                var j = this.deep(index-1);
                this.data.que.push(j)
            },
            // 下移
            downt:function(index){
                var a = this.deep(index-1);
                var b = this.deep(index);
                this.data.que.splice(index-1,1)
                this.data.que.splice(index,0,a)
            },
            // 上移
            moveu:function(index){
                var a = this.deep(index-2);
                var b = this.deep(index-1);
                this.data.que.splice(index-2,1)
                this.data.que.splice(index,-1,a)
            },
            del:function(index){
                this.data.que.splice(index-1,1)
            },
            date:function(date){
                this.date = date;
            }
        },
        // 组件
        components:{
            question,
            n_title,
            date,
            pop
        }
    }
</script>
<style>
    /* 过渡效果 */
    .n_add_t-transition {
      transition: height .3s ease;
      height: 30px;
      overflow: hidden;
    }

    /* .expand-enter 定义进入的开始状态 */
    /* .expand-leave 定义离开的结束状态 */
    .n_add_t-enter, .n_add_t-leave {
      height: 0;
      opacity: 0;
    }
    /*  new  */
    #edit  span.edit-title{
        display: block;
        margin:0;
        height: 34px;
        padding-top: 2px;
        line-height: 1.42857143;
        text-align: center;
        font-size: 24px;
    }
    #edit  span.edit-title:hover{
        background: #fff;
    }
    #edit  input.edit-title{
        margin: 0;
        padding:0;
        text-align: center;
        font-size: 24px;
        border :0;
    }
    #edit>.content {
        margin-top: 10px;
        margin-bottom: 10px;
        padding:20px;
        border-top: 2px solid #ccc;
        border-bottom: 2px solid #ccc;
    }
    #edit .adds {
        margin-top: 10px;
        border: 1px solid #ccc;
    }
    #edit .content .add{
        height: 80px;
        line-height: 80px;
        background:#ddd;
        color: #777;
        font-size: 24px;
        text-align: center;
        cursor: pointer;
    }
    #edit .content .adds .btns {
        position: relative;
        width: 205px;
        margin: 10px auto 10px auto;
    }
    #edit .footer .btns {
        float: right;
    }
</style>