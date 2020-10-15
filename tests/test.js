/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

var expect = require("chai").expect;
var builder = require("../out/index");
// var builder = require("../index");
var fs = require("fs");

describe("#build()", function () {
  it("should return the expected annotated text object", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/annotatedtext.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/test.html", "utf8");
    const result = builder.build(text);
    expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly", function () {
    const expected = fs.readFileSync("./tests/test.html", "utf8");
    const annotatedtext = builder.build(expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    expect(result).to.equal(expected);
  });

  it("should return the expected annotated text with backslashes object", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/backslashes.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/backslashes.html", "utf8");
    const result = builder.build(text);
    expect(result).to.deep.equal(expected);
  });

  it("should match the original document with backslashes exactly", function () {
    const expected = fs.readFileSync("./tests/backslashes.html", "utf8");
    const annotatedtext = builder.build(expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    expect(result).to.equal(expected);
  });
});
