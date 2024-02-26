import * as chai from "chai";
import * as builder from "../out/index.js";
import fs from "node:fs";

describe("#build()", function () {
  it("should return the expected annotated text object", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/annotatedtext.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/test.html", "utf8");
    const result = builder.build(text);
    chai.expect(result).to.deep.equal(expected);
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
    chai.expect(result).to.equal(expected);
  });

  it("should return the expected annotated text with backslashes object", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/backslashes.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/backslashes.html", "utf8");
    const result = builder.build(text);
    chai.expect(result).to.deep.equal(expected);
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
    chai.expect(result).to.equal(expected);
  });
});
