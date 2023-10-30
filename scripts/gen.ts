#!/usr/bin/env ts-node

import { writeFile, copyFile } from 'fs/promises'
import { extensions as fileExtensions } from '../vscode-icons/src/iconsManifest/supportedExtensions'
import { extensions as folderExtensions } from '../vscode-icons/src/iconsManifest/supportedFolders'

const cartesian = (...a: [[string, string]][][]) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    a.reduce((a: any, b: any) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())))

function sortIcons([extA, _]: [string, string], [extB, __]: [string, string]) {
    return extA.localeCompare(extB);
}

const fileIconsWithoutDisabled = fileExtensions
    .supported
    .filter(icon => !icon.disabled);

const simpleFilenameIcons = fileIconsWithoutDisabled
    .filter(icon => icon.filename)
    .flatMap(icon => icon.extensions.map(ext => [ext, icon.icon]))

const complexFilenameIcons = fileIconsWithoutDisabled
    .filter(icon => icon.filename && !icon.languages && icon.filenamesGlob && icon.extensionsGlob && icon.filenamesGlob.length > 0 && icon.extensionsGlob.length > 0)
    .flatMap(icon => {
        return cartesian(icon.filenamesGlob, icon.extensionsGlob)
            .map(([filename, ext]) => [`${filename}.${ext}`, icon.icon])
    })

const languageIcons = fileIconsWithoutDisabled
    .filter(icon => icon.languages && icon.languages.length > 0)
    .flatMap(icon => icon.languages.map(lang => [lang.defaultExtension, icon.icon]))

const simpleExtIcons = fileIconsWithoutDisabled
    .filter(icon => !icon.filename && !icon.languages && !icon.filenamesGlob && !icon.extensionsGlob && icon.extensions.length > 0)
    .flatMap(icon => icon.extensions.map(ext => [ext, icon.icon]))

const complexExtIcons = fileIconsWithoutDisabled
    .filter(icon => !icon.filename && !icon.languages && icon.filenamesGlob && icon.extensionsGlob && icon.filenamesGlob.length > 0 && icon.extensionsGlob.length > 0)
    .flatMap(icon => {
        return cartesian(icon.filenamesGlob, icon.extensionsGlob)
            .map(([filename, ext]) => [`${filename}.${ext}`, icon.icon])
    })

const filenameIcons = [...simpleFilenameIcons, ...complexFilenameIcons]
    .sort(sortIcons);

const extIcons = [...languageIcons, ...simpleExtIcons, ...complexExtIcons]
    .sort(sortIcons);

const folderIconsWithoutDisabled = folderExtensions
    .supported
    .filter(icon => !icon.disabled);

const folderIcons = folderIconsWithoutDisabled
    .flatMap(icon => icon.extensions.map(ext => [ext, icon.icon]))
    .sort(sortIcons);

const allFileIcons = Object.fromEntries(Array.from(new Set([...filenameIcons, ...extIcons].map(([_, icon]) => icon)))
    .sort(sortIcons)
    .map((icon, id) => [icon, id]));

const allFolderIcons = Object.fromEntries(Array.from(new Set(folderIcons)).map(([_, icon]) => icon)
    .sort(sortIcons)
    .map((icon, id) => [icon, id + Object.keys(allFileIcons).length]));

await Promise.all(Object.entries(allFileIcons).map(([icon, id]) => copyFile(`vscode-icons/icons/file_type_${icon}.svg`, `icons/${id}.svg`)))
await Promise.all(Object.entries(allFolderIcons).map(([icon, id]) => copyFile(`vscode-icons/icons/folder_type_${icon}.svg`, `icons/${id}.svg`)))

const out = `
const EXT_ICONS: [(&str, u64); ${extIcons.length}] = [
    ${extIcons.map(([ext, icon]) => `("${ext}", ${allFileIcons[icon]})`).join(',\n    ')}
];

const FILENAME_ICONS: [(&str, u64); ${filenameIcons.length}] = [
    ${filenameIcons.map(([ext, icon]) => `("${ext}", ${allFileIcons[icon]})`).join(',\n    ')}
];

const FOLDER_ICONS: [(&str, u64); ${folderIcons.length}] = [
    ${folderIcons.map(([ext, icon]) => `("${ext}", ${allFolderIcons[icon]})`).join(',\n    ')}
];
`

await writeFile('gen.rs', out);
