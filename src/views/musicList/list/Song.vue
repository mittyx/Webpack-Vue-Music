<template>
    <div class="mysong">
        <van-cell-group>
            <van-cell title="我的音乐" icon="play"  is-link />
            <van-cell title="我的收藏" icon="like-o" is-link />
            <van-cell title="最近播放" icon="clock" is-link value="内容"  />
        </van-cell-group>
        <van-collapse v-model="activeNames">
            <van-collapse-item name="1">
                <div slot="title"><van-icon name="wap-nav" /> 创建的歌单</div>
                提供多样店铺模板，快速搭建网上商城
            </van-collapse-item>
             <van-collapse-item name="2">
                <div slot="title"><van-icon name="like-o" /> 收藏的歌单</div>
                提供多样店铺模板，快速搭建网上商城
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
export default {
      name: 'mysong',
      data () {
          return {
              setShow: true,
              houseShow: true,
              activeNames: ['1', '2']
          }
      },
      methods: {
      }
  }
</script>