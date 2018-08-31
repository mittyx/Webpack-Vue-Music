<template>
	<div class="operationInfo">
        <div @click="ts">jsjsjs</div>
        <v-popup v-model="componentShow" :title="popupTitle" :position="'bottom'">2333</v-popup>
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
            componentShow: true,
            popupTitle: '我是信息面板'
        }
    },
    methods: {
        ts () {
            this.componentShow = !this.componentShow
        }
    },
    mounted() {
    }
}
</script>
