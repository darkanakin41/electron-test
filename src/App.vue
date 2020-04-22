<template>
    <view-container :hide-navigator="true">
        <template v-slot:title>
            Factorio CalculatorData
        </template>
        <template v-if="!loading">
            <v-container fluid>

                <v-row>
                    <v-col cols="10">
                        <v-text-field
                                v-model="folder"
                                placeholder="Répertoire à scanner"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-btn @click="navigateUp()" :disabled="isRootLevel">
                            <v-icon>fa-level-up-alt</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="12">
                        <v-data-table
                                :headers="fileTableHeaders"
                                :items="filesData"
                                :items-per-page="10"
                                class="elevation-1"
                        >
                            <template v-slot:item.filename="{item}">
                                <v-icon>{{ item.icon }}</v-icon>
                                {{ item.filename }}
                            </template>
                            <template v-slot:item.creationDate="{value}">
                                {{ value }}
                            </template>
                            <template v-slot:item.modificationDate="{value}">
                                {{ value }}
                            </template>
                            <template v-slot:item.size="{item}">
                                <template v-if="!isFolder(item.filename)">
                                    {{ humanReadableFilesize(item.size) }}
                                </template>
                            </template>
                            <template v-slot:item.action="{item}">
                                <v-btn @click="navigateTo(item)">
                                    <v-icon>fa-eye</v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </v-container>
            <FileVisualisationDialog :open.sync="visualisationDialog" :file="visualisationFile"/>
            <Footer/>
        </template>
        <template v-else>
            <v-container fill-height fluid>
                <v-layout row wrap>
                    <v-row align="center"
                           justify="center">
                        <v-flex xs12 sm8 md4>
                            <div class="app-loading">
                                <v-progress-circular color="primary" size="200" indeterminate/>
                            </div>
                        </v-flex>
                    </v-row>
                </v-layout>
            </v-container>
        </template>
    </view-container>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'
    import Footer from '@/components/Layout/Footer.vue'
    import ViewContainer from "@/components/Layout/ViewContainer.vue";
    import fs from "fs"
    import {calculateFullpath, calculateIcon, calculateType, humanReadableFilesize, isFolder} from "@/tools/file";
    import FileVisualisationDialog from "@/components/FileVisualisationDialog.vue";

    @Component({
        components: {FileVisualisationDialog, ViewContainer, Footer}
    })
    export default class App extends Vue {
        excludedFiles: string[] = [
            ".DS_Store",
            "$RECYCLE.BIN",
            "desktop.ini",
            "System Volume Information",
            "WindowsApps"
        ]

        loading: boolean = false

        visualisationFile:any|undefined = {}
        visualisationDialog = false

        folder: string = ''
        files: string[] = []

        fileTableHeaders = [
            {
                text: 'File',
                align: 'start',
                value: 'filename',
            },
            {
                text: 'Creation Date',
                align: 'start',
                value: 'creationDate',
            },
            {
                text: 'Modification Date',
                align: 'start',
                value: 'modificationDate',
            },
            {
                text: 'Size',
                align: 'start',
                value: 'size',
            },
            {
                text: 'Actions',
                align: 'start',
                sortable: false,
                value: 'action',
            },
        ]

        async created() {
            this.$vuetify.theme.dark = true
        }

        get layout() {
            return true
            // return this.$route.meta && this.$route.meta.layout ? this.$route.meta.layout : {}
        }

        mounted() {
            this.visualisationFile = undefined
            this.folder = fs.realpathSync('') + "\\"
        }

        get filesData() {
            return this.files.filter((file) => this.excludedFiles.indexOf(file) === -1).map((file: string) => {
                let stats = fs.statSync(this._calculateFullPath(file))
                return {
                    filename: file,
                    folder: this.folder,
                    icon: this._calculateIcon(file),
                    type: this._calculateType(file),
                    creationDate: stats.ctime,
                    modificationDate: stats.mtime,
                    size: stats.size
                }
            })
        }

        get isRootLevel() {
            let folderAsArray = this.folder.split('\\')
            let lastPart = folderAsArray.pop()
            return folderAsArray.length === 1 && lastPart === ""
        }

        _calculateFullPath(filename: string) {
            return calculateFullpath(this.folder, filename)
        }

        _calculateType(filename: string) {
            return calculateType(this.folder, filename)
        }

        _calculateIcon(filename: string) {
            return calculateIcon(this.folder, filename)
        }

        humanReadableFilesize(bytes: number) {
            return humanReadableFilesize(bytes)
        }

        isFolder(filename: string) {
            return isFolder(this.folder, filename)
        }

        navigateTo(file: any) {
            if (this.isFolder(file.filename)) {
                this.folder = this._calculateFullPath(file.filename)
            } else {
                this.visualisationFile = file
                this.visualisationDialog = true
            }
        }

        navigateUp() {
            if (this.isRootLevel) {
                return
            }
            let folderAsArray = this.folder.split('\\')
            folderAsArray.pop()
            folderAsArray.pop()
            this.folder = folderAsArray.join('\\') + "\\"
            console.log(this.folder)
        }

        @Watch('folder')
        onFolderUpdate() {
            this.files = []
            if (this.folder === '' || this.folder.slice(-1) !== "\\") {
                return
            }
            this.files = fs.readdirSync(this.folder)
        }

        @Watch('visualisationDialog')
        onOpenUpdate(){
            if(!this.visualisationDialog){
                this.visualisationFile = undefined
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
