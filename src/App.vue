<template>
  <view-container :hide-navigator="layout.noNav || loading">
    <template v-slot:title>
      Factorio CalculatorData
    </template>
    <template v-if="!loading">
      <Footer />
    </template>
    <template v-else>
      <v-container fill-height fluid>
        <v-layout row wrap>
          <v-row align="center"
                 justify="center">
            <v-flex xs12 sm8 md4>
              <div class="app-loading">
                <v-progress-circular color="primary" size="200" indeterminate />
              </div>
            </v-flex>
          </v-row>
        </v-layout>
      </v-container>
    </template>
  </view-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import Footer from '@/components/Layout/Footer.vue'
  import ViewContainer from "@/components/Layout/ViewContainer.vue";

  @Component({
    components: {ViewContainer, Footer}
  })
  export default class App extends Vue {
    loading: boolean = false

    async created() {
      this.$vuetify.theme.dark = true
    }

    get layout() {
      return true
      // return this.$route.meta && this.$route.meta.layout ? this.$route.meta.layout : {}
    }
  }
</script>

<style lang="scss" scoped>
</style>
