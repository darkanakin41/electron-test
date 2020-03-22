<template>
    <v-app>
        <v-container fluid class="pa-0 fill-height">
            <v-navigation-drawer app v-model="drawer" v-if="!hideNavigator">
            </v-navigation-drawer>

            <v-app-bar app id="top-bar">
                <v-app-bar-nav-icon v-if="!hideNavigator" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>
                    <slot name="title">
                    </slot>
                </v-toolbar-title>
            </v-app-bar>
            <v-content class="fill-height">
                <slot />
            </v-content>
        </v-container>
    </v-app>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class ViewContainer extends Vue {
        @Prop({type: Boolean, default: false})
        hideNavigator: boolean
        drawer: Boolean = true
    }
</script>


<style lang="scss" scoped>

</style>
