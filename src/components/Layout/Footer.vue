<template>
    <v-footer app height="auto">
        <p class="copyright">
            <i class="far fa-copyright"></i> Copyright Pierre LEJEUNE, tous droits réservés.
        </p>
        <div class="social">
            <a href="https://github.com/darkanakin41/" target="_blank" class="gitlab"><i class="fab fa-github"></i></a>
            <a href="https://twitter.com/dark_csgo" target="_blank" class="twitter"><i class="fab fa-twitter"></i></a>
            <a href="https://www.linkedin.com/in/pierre-lejeune/" target="_blank" class="linkedin"><i class="fab fa-linkedin-in"></i></a>
        </div>
    </v-footer>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class TopBarContent extends Vue {
    }
</script>

<style lang="scss" scoped>
</style>
