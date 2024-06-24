import { beforeAll, describe, expect, test } from "vitest";
import { getIconForFile, getIconForFolder, setCDN } from "../dist/lib";

beforeAll(() => {
  setCDN("./icons");
});

describe("getIconForFile", () => {
  test("common languages", () => {
    expect(getIconForFile("./test.js")).toEqual("./icons/296.svg");
    expect(getIconForFile("./test.ts")).toEqual("./icons/633.svg");
    expect(getIconForFile("./test.tsx")).toEqual("./icons/529.svg");
    expect(getIconForFile("./test.jsx")).toEqual("./icons/508.svg");
    expect(getIconForFile("./test.json")).toEqual("./icons/284.svg");
    expect(getIconForFile("./test.yaml")).toEqual("./icons/708.svg");
    expect(getIconForFile("./test.yml")).toEqual("./icons/708.svg");
    expect(getIconForFile("./test.md")).toEqual("./icons/361.svg");
    expect(getIconForFile("./test.css")).toEqual("./icons/116.svg");
    expect(getIconForFile("./test.html")).toEqual("./icons/255.svg");
    expect(getIconForFile("./test.rs")).toEqual("./icons/525.svg");
  });

  test("tauri files", () => {
    expect(getIconForFile("./tauri.conf.json")).toEqual("./icons/602.svg");
    expect(getIconForFile("./.taurignore")).toEqual("./icons/602.svg");
  });
});

describe("getIconForFolder", () => {
  test("common folders", () => {
    expect(getIconForFolder("./.github")).toEqual("./icons/862.svg");
    expect(getIconForFolder("./src")).toEqual("./icons/1054.svg");
    expect(getIconForFolder("./tests")).toEqual("./icons/1084.svg");
  });

  test("tauri folders", () => {
    expect(getIconForFolder("./src-tauri")).toEqual("./icons/1079.svg");
  });
});
