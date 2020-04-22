import fs from "fs";
import {lookup} from "mime-types";

export function humanReadableFilesize(bytes: number): string {
    let thresh = 1000;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    let units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}

export function isFolder(folder: string, filename: string): boolean {
    return fs.lstatSync([folder, filename].join('\\')).isDirectory()
}

export function calculateFullpath(folder: string, filename: string): string {
    let fullpath
    if (folder.slice(-1) === "\\") {
        fullpath = folder + filename
    } else {
        fullpath = [folder, filename].join('\\')
    }

    if (isFolder(folder, filename)) {
        fullpath += "\\"
    }
    return fullpath
}

export function calculateType(folder: string, filename: string): string {
    if (isFolder(folder, filename)) {
        return "folder"
    }

    if (filename.indexOf('.git') !== -1 || filename.indexOf('docker') !== -1) {
        return "text"
    }

    let mimeType: string | boolean = lookup(calculateFullpath(folder, filename))

    if (mimeType !== false && mimeType.indexOf('adobe') !== -1) {
        return "adobe"
    } else if (mimeType !== false && mimeType.indexOf('video') !== -1) {
        return "video"
    } else if (mimeType !== false && mimeType.indexOf('image') !== -1) {
        return "image"
    }

    return "text"
}

export function calculateIcon(folder: string, filename: string): string | undefined {
    if (isFolder(folder, filename)) {
        return "fa-folder"
    }

    if (filename.indexOf('.git') !== -1) {
        return "fab fa-git"
    } else if (filename.indexOf('docker') !== -1) {
        return "fab fa-docker"
    }
    let mimeType: string | boolean = lookup(calculateFullpath(folder, filename))

    if (mimeType !== false && mimeType.indexOf('adobe') !== -1) {
        return "fab fa-adobe"
    } else if (mimeType !== false && mimeType.indexOf('video') !== -1) {
        return "fas fa-video"
    } else if (mimeType !== false && mimeType.indexOf('image') !== -1) {
        return "fa-image"
    }

    let icon: string | undefined

    switch (mimeType) {
        default:
            console.error(`Unknown mimeType ${mimeType} for file ${filename}`)
            break;
        case "application/javascript":
        case "application/json":
            icon = "fab fa-js"
            break
        case "application/x-httpd-php":
            icon = "fab fa-php"
            break
        case "application/xml":
        case "text/yaml":
            icon = "fas fa-file-code"
            break
        case "text/markdown":
            icon = "fab fa-markdown"
            break
        case "text/html":
            icon = "fab fa-html5"
            break
        case "text/plain":
            icon = "far fa-file-alt"
            break
    }

    return icon
}