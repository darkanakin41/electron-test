export default interface Filedata {
    filename: string
    folder: string
    icon: string
    type: string
    creationDate: Date | undefined
    modificationDate: Date | undefined
    size: number
}