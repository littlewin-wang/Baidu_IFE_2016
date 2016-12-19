<template>
    <div class="chart"  transition="gui">
    {{name | json}}
    {{num | json}}
        <h2 class="text-center">Q{{index}} {{data.title}}</h2>
        <div style="text-align:center;">
            <span>
                题型：
                <span v-if="data.type == 'radio'">单选题</span>
                <span v-if="data.type == 'checkbox'">多选题</span>
                <span v-if="data.type == 'textarea'">文本题</span>
                <span></span>
            </span>
        </div>
        <div class="chartss" v-if="data.type!='textarea'">
            <canvas width="500" height="400" align="center" class="charts" v-el:canvas ></canvas>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts';
    export default{
        data(){
            return{
                datas:[],
            }
        },
        props:{
            index:Number,
            data:Object,
        },
        ready:function(){
            if(this.data.type!="textarea"){
                for(var i=0;i<this.data.problem.length;i++){
                    this.datas.push({"name":this.data.problem[i].title,"value":this.data.problem[i].num});
                }
                this.option()
            }
        },
        methods:{
            option:function(){
                var myChart = echarts.init(this.$els.canvas);
                myChart.setOption({
                    title : {
                        subtext: '圆形图',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:this.datas,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ],
                    textStyle:{
                        fontSize:24
                    }
                });
            }
        }
    }
</script>
<style>
     canvas { display: block; } 
     .chartss {
        width:500px;
        margin:0 auto;
     }
     .chart{
        border-bottom: 1px solid #ccc;
        margin: 20px 0;
     }
</style>