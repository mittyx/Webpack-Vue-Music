<template>
  <div class="musicProgress">
    <div class="ball"></div>
    <div class="cache" :style="{ width: cacheWidth + '%' }"></div>
  </div>
</template>

<script>
export default {
    name: 'music-progress',
    data () {
        return {
            cacheWidth: 10
        }
    }
}
</script>

<style lang="scss">
$music-progress: 3px;
.musicProgress{
  height: $music-progress;
  width: 100%;
  margin: auto 0;
  background-color: #E6E6E8;
  position: relative;
  .ball{
    position: absolute;
    width: $music-progress*5;height: $music-progress*5;
    top: -($music-progress*5 - $music-progress) / 2;
    left: -($music-progress*5 - $music-progress) / 2;
    border-radius: 100%;
    background-color: white;
    z-index: 2;
  }
  .cache{
    position: absolute;
    top: 0;
    height: $music-progress;
    background-color: #C0C0C2;
    z-index: 1;
  }
}
</style>
