<template>
    <div transition="gui" class="see">
        <h2 class="text-center">{{data.title}}</h2>
        <div class="content">
            <div class="question" v-for="s in data.que">
                <template v-if="s.type=='radio'">
                    <h4>Q{{$index+1}}  (单选题) {{s.title}}</h4>
                    <ul>
                        <li v-for="t in s.problem">
                            <input type="radio" name="radio-{{s.title}}"> 
                            <span class="">{{t.title}}</span>
                        </li>
                    </ul>
                </template>
                <template v-if="s.type=='checkbox'">
                    <h4>Q{{$index+1}}  (多选题) {{s.title}}</h4>
                    <ul>
                        <li v-for="t in s.problem">
                            <input type="checkbox" name="radio-{{s.title}}"> 
                            <span class="">{{t.title}}</span>
                        </li>
                    </ul>
                </template>
                <template v-if="s.type=='textarea'">
                    <h4>Q{{$index+1}}  (文本题) {{s.title}}</h4>
                    <ul>
                        <li><textarea>123</textarea></li>
                    </ul>
                </template>
            </div>
        </div>
        <button type="button" class="btn btn-default btn-sm">
            提交
        </button>
    </div>
</template>
<script>
    import data from "../data"
    export default{
        data(){
            return{
                data:{}
            }
        },
        route:{
            data(){
                let _data = data.out()
                let id = this.$route.path.replace(/[^0-9]/ig,"")
                if(id>_data.length){
                    console.log(2)
                }else{
                    this.data  = _data[id]
                }
            }
        }
    }
</script>
<style>
    .see h2.text-center{
        border-bottom: 3px solid #ccc;
    }
    .see .content {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .see ul {
        list-style:none;
    }
    .see textarea {
        width: 100%;
    }
    .see .question {
        border-bottom: 1px solid #ccc;
    }
</style>