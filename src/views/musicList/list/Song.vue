<template>
    <div class="mysong">
        <van-cell-group>
            <van-cell title="我的音乐" icon="play"  is-link />
            <van-cell title="我的收藏" icon="like-o" is-link/>
            <van-cell title="最近播放" icon="clock" is-link value="内容"/>
        </van-cell-group>
        <van-collapse v-model="activeNames">
            <van-collapse-item name="1">
                <div slot="title"><van-icon name="wap-nav" /> 创建的歌单</div>
                <div v-for="(item, index) in sheelList">
                    <my-cell  :title="item.title" :content="item.amount" :obj="item" :background="item.background" @btnClick="more"></my-cell>
                </div>
            </van-collapse-item>
             <van-collapse-item name="2">
                <div slot="title"><van-icon name="like-o" /> 收藏的歌单</div>
                <div v-for="(item, index) in sheelList">
                    <my-cell  :title="item.title" :content="item.amount" :obj="item" :background="item.background" @btnClick="more"></my-cell>
                </div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
export default {
      name: 'mysong',
      data () {
          return {
              activeNames: ['1', '2'],
              sheelList: []
          }
      },
      methods: {
          more(calldata) {
              this.$store.state.popupShow = true
              this.$store.state.popupTitle = calldata.title
          }
      },
      mounted() {
          this.$ajax.get('http://musicListSheel.cn').then(res => {
              console.log(this.sheelList = res.data.data)
          }).catch((error) => console.log(error))
      }
  }
</script>