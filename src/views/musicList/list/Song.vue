<template>
    <div class="mysong">
        <van-cell-group>
            <van-cell title="我的音乐" icon="play"  is-link @click="popup"/>
            <van-cell title="我的收藏" icon="like-o" is-link @click="popup"/>
            <van-cell title="最近播放" icon="clock" is-link value="内容"  @click="popup"/>
        </van-cell-group>
        <van-collapse v-model="activeNames">
            <van-collapse-item name="1">
                <div slot="title"><van-icon name="wap-nav" /> 创建的歌单</div>
                <div class="cell">
                    <img />
                    <div class="info"></div>
                    <div class="btn"></div>
                </div>
            </van-collapse-item>
             <van-collapse-item name="2">
                <div slot="title"><van-icon name="like-o" /> 收藏的歌单</div>
                提供多样店铺模板，快速搭建网上商城
            </van-collapse-item>
        </van-collapse>
        <!-- <van-popup v-model="show" position="right" :overlay="false"> -->
  内容
</van-popup>
        <!-- <van-popup v-model="show">内容</van-popup> -->
    </div>
</template>

<script>
export default {
      name: 'mysong',
      data () {
          return {
              setShow: true,
              houseShow: true,
              activeNames: ['1', '2'],
              show: true
          }
      },
      methods: {
          popup() {
              this.show = true
          }
      },
      mounted() {
          console.log(this)
      }
  }
</script>

<style lang="scss" scoped>
    .cell{
        height: 10px;
        display: flex;
        img {
            background-color:brown
        }
        .info{
            height: 10px;
            width:100px;
            background-color: aqua
        }
        .btn{
            background-color: bisque
        }
    }
</style>