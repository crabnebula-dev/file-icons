import {beforeAll, describe, expect, test} from 'vitest'
import { getIconForFile, getIconForFolder, setCDN } from '../dist/lib'

beforeAll(() => {
    setCDN("./icons")
})

describe('getIconForFile', () => {
    test('common languages', () => {
        expect(getIconForFile("./test.js")).toEqual("./icons/288.svg")
        expect(getIconForFile("./test.ts")).toEqual("./icons/598.svg")
        expect(getIconForFile("./test.tsx")).toEqual("./icons/503.svg")
        expect(getIconForFile("./test.jsx")).toEqual("./icons/485.svg")
        expect(getIconForFile("./test.json")).toEqual("./icons/277.svg")
        expect(getIconForFile("./test.yaml")).toEqual("./icons/670.svg")
        expect(getIconForFile("./test.yml")).toEqual("./icons/670.svg")
        expect(getIconForFile("./test.md")).toEqual("./icons/345.svg")
        expect(getIconForFile("./test.css")).toEqual("./icons/114.svg")
        expect(getIconForFile("./test.html")).toEqual("./icons/248.svg")
        expect(getIconForFile("./test.rs")).toEqual("./icons/499.svg")
    })

    test('tauri files', () => {
        expect(getIconForFile("./tauri.conf.json")).toEqual("./icons/571.svg")
        expect(getIconForFile("./.taurignore")).toEqual("./icons/571.svg")
    })
})

describe('getIconForFolder', () => {
    test('common folders', () => {
        expect(getIconForFolder("./.github")).toEqual("./icons/823.svg")
        expect(getIconForFolder("./src")).toEqual("./icons/1012.svg")
        expect(getIconForFolder("./tests")).toEqual("./icons/1042.svg")
    })

    test('tauri folders', () => {
        expect(getIconForFolder("./src-tauri")).toEqual("./icons/1037.svg")
    })
})