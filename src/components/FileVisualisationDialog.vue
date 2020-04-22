<template>
    <v-dialog v-model="open" max-width="500" v-if="file !== undefined" @click:outside="close($event)" fullscreen>
        <v-card>
            <v-toolbar dark color="red">
                <v-btn icon dark @click="close()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{file.filename}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                </v-toolbar-items>
            </v-toolbar>

            <v-card-text>
                <template v-if="loading">
                    <div class="app-loading">
                        <v-progress-circular color="primary" size="200" indeterminate/>
                    </div>
                </template>
                <template v-else>
                    <template v-if="file.type === 'image'">
                        <v-img :src="fileContent"/>
                    </template>
                    <template v-if="file.type === 'text'">
                        <v-textarea v-model="fileContent" readonly outlined filled height="85vh"/>
                    </template>
                </template>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
    import fs from "fs"
    import {calculateFullpath} from "@/tools/file";
    import {lookup} from "mime-types";

    @Component
    export default class FileVisualisationDialog extends Vue {
        @Prop({type: Boolean, default: false})
        open: boolean
        @Prop() file: any | undefined;

        fileContent: string | null = ""
        loading: boolean = false

        @Watch('file')
        onFileUpdate() {
            if (this.file === undefined) {
                this.fileContent = null
                return
            }

            this.loading = true
            let content: Buffer = fs.readFileSync(calculateFullpath(this.file.folder, this.file.filename));

            switch (this.file.type) {
                case 'image':
                    var reader = new FileReader();
                    reader.onloadend = () => {
                        console.log(reader.result)
                        if (typeof reader.result === "string") {
                            this.fileContent = reader.result;
                        }
                        this.loading = false
                    }
                    var mimeType = lookup(calculateFullpath(this.file.folder, this.file.filename))
                    if (mimeType === false) {
                        this.loading = false
                        return
                    }
                    reader.readAsDataURL(new File([content], this.file.filename, {type: mimeType}))
                    break;
                case "text":
                    console.log(content.toString())
                    this.fileContent = content.toString();
                    this.loading = false
                    break;
            }
        }

        close($event: Event | undefined = undefined) {
            if ($event !== undefined) {
                $event.preventDefault()
            }
            this.$emit('update:open', false)
        }
    }
</script>

<style scoped>
</style>