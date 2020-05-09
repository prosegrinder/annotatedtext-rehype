"use strict";

var annotatedtext = require("annotatedtext");
var unified = require("unified");
var rehypeparse = require("rehype-parse");

const defaults = {
  children(node) {
    return annotatedtext.defaults.children(node);
  },
  annotatetextnode(node, text) {
    return annotatedtext.defaults.annotatetextnode(node, text);
  },
  interpretmarkup(text = "") {
    let countP = (text.match(/\<\/p>/g) || []).length;
    let countH = (text.match(/\<\/h\d+>/g) || []).length;
    let countBr = (text.match(/\<br[\s\/]*>/g) || []).length;
    let coungNl = (text.match(/\n/g) || []).length;
    return "\n".repeat( (2 * countP) + (2 * countH) + countBr + coungNl );
  },
  rehypeoptions: {
    emitParseErrors: false
  }
};

function build(text, options = defaults) {
  const processor = unified()
    .use(rehypeparse, options.rehypeoptions);
  return annotatedtext.build(text, processor.parse, options);
}

module.exports = {
  defaults,
  build
};
