<template>
    <div class="test">
        <v-list>
            <my-song slot="li0"></my-song>
            <groom slot="li1"></groom>
            <song-sheel slot="li2"></song-sheel>
        </v-list>
    </div>
</template>

<script>
    import liList from "./listTouch"
    import MySong from "./list/Song"
    import Groom from "./list/Groom"
    import SongSheel from "./list/SongSheel"
    export default {
        components:{
            'v-list' : liList,
            'my-song' : MySong,
            'song-sheel' : SongSheel,
            'Groom' : Groom
        },
        data(){
            return{

            }
        }

    }
</script>

