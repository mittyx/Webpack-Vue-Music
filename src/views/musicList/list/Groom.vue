<template>
    <div class="groom">
        <ul class="groom-list">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "groom"
    }
</script>

<style lang="scss" scoped>
    .groom{
        .groom-list{
            display: flex;
            flex-direction: column-reverse;
            li{
                height: 1.6rem;
                box-sizing: border-box;
                border-bottom: 1px solid #999999;
            }
        }
    }
</style>