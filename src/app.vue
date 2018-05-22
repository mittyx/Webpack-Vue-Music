<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
      name: 'app',
      data () {
          return {}
      },
      components:{
      },
      mounted(){

      }

  }
</script>
