<template>
	<div class="operationInfo">
        <div @click="ts">jsjsjs</div>
        <v-popup :componentShow="show" :title="popupTitle">2333</v-popup>
	</div>
</template>

<script>
import Popup from 'src/components/popup/index'
export default {
    components:{
          'v-popup': Popup
    },
    data () {
        return {
            show: true,
            popupTitle: '我是信息面板'
        }
    },
    methods: {
        ts () {
            this.show = !this.show
        }
    },
    mounted() {
    }
}
</script>
