"use strict";

var annotatedtext = require("annotatedtext");
var unified = require("unified");
var rehypeparse = require("rehype-parse");

const defaults = {
  children(node) {
    return annotatedtext.defaults.children(node);
  },
  annotatetextnode(node) {
    return annotatedtext.defaults.annotatetextnode(node);
  },
  interpretmarkup(text = "") {
    let count_p = (text.match(/\<\/p>/g) || []).length;
    let count_br = (text.match(/\<br[\s\/]*>/g) || []).length;
    let count_nl = (text.match(/\n/g) || []).length;
    return "\n".repeat( (2 * count_p) + count_br + count_nl );
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
