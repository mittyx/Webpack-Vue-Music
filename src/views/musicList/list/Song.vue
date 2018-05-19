<template>
    <div class="mysong">
        <van-cell-group>
            <van-cell title="我的音乐" icon="play"  is-link />
            <van-cell title="我的收藏" icon="like-o" is-link />
            <van-cell title="最近播放" icon="clock" is-link value="内容"  />
        </van-cell-group>
        <van-collapse v-model="activeName" accordion>
            <van-collapse-item title="有赞微商城" name="1">
                提供多样店铺模板，快速搭建网上商城
            </van-collapse-item>
            <van-collapse-item title="有赞零售" name="2" >
                网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
            </van-collapse-item>
            <van-collapse-item title="有赞美业" name="3">
                线上拓客，随时预约，贴心顺手的开单收银
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
    export default {
        name: "mysong",
        data(){
            return{
                setShow:true,
                houseShow:true,
                activeName: '2'
            }
        },
        methods:{
        }
    }
</script>