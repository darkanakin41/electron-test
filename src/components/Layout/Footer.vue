<template>
    <v-footer app height="auto">
        <p class="copyright">
            <i class="far fa-copyright"></i> Copyright Pierre LEJEUNE, tous droits réservés.
        </p>
        <div class="social">
            <a class="gitlab" @click.prevent="openUrl('https://github.com/darkanakin41/')"><i class="fab fa-github"></i></a>
            <a class="twitter" @click.prevent="openUrl('https://twitter.com/dark_csgo')"><i class="fab fa-twitter"></i></a>
            <a class="linkedin" @click.prevent="openUrl('https://www.linkedin.com/in/pierre-lejeune/')"><i class="fab fa-linkedin-in"></i></a>
        </div>
    </v-footer>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class TopBarContent extends Vue {

        openUrl(url: string) {
            if (process.versions['electron'] !== undefined) {
                const {shell} = require('electron')
                shell.openExternal(url)
            }else{
                window.open(url)
            }
        }
    }
</script>

<style lang="scss" scoped>
    footer {
        flex-direction: row;
        justify-content: space-between;
        align-self: center;

        margin: 0;
        padding: 0;
        font-size: 1rem;

        background: #101010;
        text-align: center;
        color: transparentize(white, .5);

        & > * {
            line-height: 1.5;
            padding: .5rem .7rem;
        }

        .copyright {
            display: block;
            margin: 0;
        }

        .social {
            padding: 10px 0;
            font-size: 1.5rem;

            a {
                margin: 0 10px;
            }
        }
    }
</style>
