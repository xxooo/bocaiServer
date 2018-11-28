<template>
    <div>
        <div class="tool-bar">
            <span class="bar-title" >{{$root.langs.alarm["smartspc.alarm.alarmProcess"]}}</span>
        </div>
        <div class="cent">
            <div>
                <span>
                    <h6>{{$root.langs.alarm["smartspc.alarm.node"]}} 0</h6>
                    <p>{{$root.langs.alarm["smartspc.alarm.create"]}}</p>
                </span>
                <img src="./img/j.jpg">
            </div>
            <div v-for="(item,i) in nodeDate">
                <span>
                    <h6>{{$root.langs.alarm["smartspc.alarm.node"] +(i+1)}}</h6>
                    <p>{{item.handler}}</p>
                </span>
                <img src="./img/j.jpg">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                nodeDate:[]
            }
        },
        async created(){
            let res = await this.$get(`${window.gatewayspc}/warm/flow`);
            if(+res.code===0)this.nodeDate=res.data;
            console.log(res,">>>>>>.");
        }
    }
</script>
<style scoped >


    .cent{
        margin: 0 20px;
        padding: 200px 190px;
        background: #fff;
        display: flex;
    }
    .cent div:last-child img{
        display: none
    }
    .cent img{
        height: 80px;
        vertical-align: middle;
        width: 150px;
        margin: 0 25px;
    }
    .cent span{
        display: inline-block;
        width: 160px;
        height: 80px;
        text-align: center;
        background: #cecece;
        border-radius: 5px;
        color: #fff;
        vertical-align: middle;
    }
    .cent span *{
        margin: 0;
    }
    .cent span h6{
        line-height: 34px;
        margin-top: 10px;
        font-size: 14px;
    }
</style>
