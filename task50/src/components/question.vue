<template>
    <div class="n_radio question" @mouseover="open" @mouseout="shut">
        <h4>
            <template 
            v-if="que.type=='radio'">
                Q{{index}}  (单选题)
            </template>
            <template 
            v-if="que.type=='checkbox'">
                Q{{index}}  (多选题)
            </template>
            <template 
            v-if="que.type=='textarea'">
                Q{{index}}  (文本题)
            </template>
            <span>
                <n_title :text.sync='que.title' ></n_title>
            </span>
        </h4>
        <ul>
            <!-- 单选 -->
            <template v-for="test in que.problem" v-if="que.type=='radio'">
                <li>
                    <span class="glyphicon glyphicon-unchecked"></span>
                    <n_title 
                        :text.sync="test.title" 
                        :class="''" 
                        :iclass="''"
                    ></n_title>
                    <span class="glyphicon glyphicon-remove" 
                    @click="pr_del($index)"
                    ></span>
                </li>
            </template>
            <!-- 多选 -->
            <template v-for="test in que.problem" v-if="que.type=='checkbox'">
                <li>
                    <span class="glyphicon glyphicon-record"></span>
                    <n_title 
                        :text.sync="test.title" 
                        :class="''" 
                        :iclass="''"
                    ></n_title>
                    <div class="glyphicon glyphicon-remove" 
                        @click="pr_del($index)"
                    ></div>
                </li>
            </template>
            <!-- 文本 -->
            <template  v-if="que.type=='textarea'">
                <li>
                    <span class="glyphicon glyphicon-align-justify"></span>
                </li>
            </template>
            <li class="q_add" 
                @click="pr_add"  
                v-if="que.type=='radio' || que.type=='checkbox'"
            >+</li>
        </ul>
            <!--必填按钮-->
        <div class="required btns">
            <input type="checkbox" name="required" v-model="que.required" :true="true" :false="false"/><span>此题是否必填</span>
        </div>
        <!--功能按钮-->
        <div class="fun btns" v-show="btn">
            <span @click="moveu"
            v-show="index!=1"
            >上移</span>
            <span
            v-show="on()"
             @click="downt">下移</span>
            <span @click="overlap">复用</span>
            <span @click="del">删除</span>
        </div>
    </div>
</template>
<script>
/* 
index: 第几个问题
type: 类型
 */
import n_title from "./n_title"
    export default {
        data(){
            return {
                problem:new Array,
                btn:false,
                if_move:false
            }
        },
        props: {
            que:Object,
            index: Number,
            type: String,
            max:Number
        },
        components:{
            n_title
        },
        methods:{
            pr_add:function(){
                this.que.problem.push({"title":"问题","num":0})
            },
            pr_del:function(index){
                this.que.problem.splice(index,1)
            },
            // 复用
            overlap:function(){
                this.$dispatch("overlap",this.index)
            },
            // 下移
            downt:function(){
                this.$dispatch("downt",this.index)
            },
            // 上移
            moveu:function(){
                this.$dispatch("moveu",this.index)
            },
            // 删除
            del:function(){
                this.$dispatch("del",this.index)
            },
            open:function(){
                this.btn =  true;
            },
            shut:function(){
                this.btn =  false;
            },
            on:function(){
                if(this.max==this.index){
                    return false
                }else{
                    return true
                }
            }
        }
    }
</script>
<style>
    .content .questions>div.question{
        transition: 0.3s all;
        position: relative;
        padding: 10px;
    }
    .content .questions>div.question:hover{
        background: #dedede;
    }
    .content .questions ul{
        padding-left: 30px;
    }
    .content .questions li{
        list-style: none;
    }
    .content .questions li.q_add{
        cursor: pointer;
        text-align: center;
        font-size: 18px;
        border: 2px dashed #ccc;
        box-shadow: 10px;
        border-radius: 2px;
        opacity: 0;
    }
    .content .questions li.q_add:hover{
        opacity: 1;
    }
    .content .questions input{
        margin-right: 5px;
    }
    .content .questions textarea{
        width: 100%;
        max-width: 100%;
    }
    .content .questions .required{
        position: absolute;
        top: 5px;
        right: 10px;
        height: 0;
        font-size: 10px;
    }
    .content .questions .fun{
        position: absolute;
        bottom: 20px;
        right: 10px;
        height: 0;
        font-size: 10px;
    }
    .content .questions .question h4 {
        height: 21px;
    }
    .content .questions .question input {
        width: auto;
        border: 0;
    }
    .glyphicon-remove{
        cursor: pointer;
    }
    .glyphicon-align-justify {
        font-size: 46px;
    }
    .content .questions>div.question>div.fun span{
        cursor:pointer;
    }
</style>