<template>
    <div id="statistics" transition="gui">
        <h1 class="text-center">{{data.title}}</h1>
        <div v-for="t in data.que">
            <echarts :data="t" :index="$index+1"></echarts>
        </div>
    </div>
</template>
<script>
    import data from "../data";
    import echarts from './echarts';
    export default{
        data(){
            return{
                data:{},
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
        },
        components:{
            echarts
        }
    }
</script>