<template>
    <div class="yiiuPop" v-if="on"  transition="modal">
        <div class="popContent">
            <div class="popTop">
                <h1>警告</h1>
            </div>
            <div class="content">
                {{war}}
            </div>
            <div class="select">
                <button type="button" class="btn btn-primary" @click="c">
                    <span class="glyphicon glyphicon-ok"></span>
                    确定
                </button>
                <button type="button" class="btn btn-primary" @click="e" v-if="single">
                    <span class="glyphicon glyphicon-remove"></span>
                    取消
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:{
            on:Boolean,
            war:String,
            single: Boolean,
            confirm:Function
        },
        methods:{
            c:function(){
                this.on=false;
                if(this.confirm){
                    this.confirm()
                }
            },
            e:function(){
                this.on=false;
                return false;
            }
        }
    }
</script>
<style>
.yiiuPop {
    transition: all .3s ease;
    z-index: 1000;
    position: fixed;
    top:0;
    left:0;
    width: 100% ;
    height: 100%;
    background: rgba(0,0,0,.5);
    overflow: hidden;     
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-perspective: 300px;
    -moz-perspective: 300px;
    -ms-perspective: 300px;
    -o-perspective: 300px;
    perspective: 300px;
}
.yiiuPop>div.popContent {
    margin:0;
    padding: 0;
    position: fixed;
    top: 50%;   
    left: 50%;
    margin-left:-200px;
    margin-top: -100px;
    width: 400px;
    height: 200px;
    background-color: #fff;
    border: 1px solid #337ab7;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select:none;
    -khtml-user-select:none;
    -webkit-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
.yiiuPop>div.popContent .popTop h1{
    margin:0;
    font-size: 24px;
}
.yiiuPop>div.popContent .popTop{
    background-color: #337ab7;
    color: #fff;   
    padding: 10px 15px;
    border-bottom: 1px solid #337ab7;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}
.yiiuPop>div.popContent .content{
    line-height: 90px;
    text-align: center;
    font-size: 16px;
}
.yiiuPop>div.popContent .select  {
    text-align:center;
    margin: 0 auto;
}
.yiiuPop>div.popContent .select .btn  {
    display:table-cell;
}
.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter,
.modal-leave{
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>