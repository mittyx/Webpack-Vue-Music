<template>
	<div class="operationInfo">
        <popup v-model="$store.state.popupShow" :title="$store.state.popupTitle" :position="'bottom'"></popup>
	</div>
</template>

<script>
export default {
    data () {
        return {
        }
    }
}
</script>
