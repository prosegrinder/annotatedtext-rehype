import * as annotatedtext from "annotatedtext";
import * as unified from "unified";
import { IOptions } from "../types";
import * as rehypeparse from "rehype-parse";

const defaults = {
  children(node: annotatedtext.INode) {
    return annotatedtext.defaults.children(node);
  },
  annotatetextnode(node: annotatedtext.INode, text: string) {
    return annotatedtext.defaults.annotatetextnode(node, text);
  },
  interpretmarkup(text: string = "") {
    const countP = (text.match(/\<\/p>/g) || []).length;
    const countH = (text.match(/\<\/h\d+>/g) || []).length;
    const countBr = (text.match(/\<br[\s\/]*>/g) || []).length;
    const coungNl = (text.match(/\n/g) || []).length;
    return "\n".repeat(2 * countP + 2 * countH + countBr + coungNl);
  },
  rehypeoptions: {
    emitParseErrors: false,
  },
};

function build(text: string, options: IOptions = defaults) {
  const processor = unified().use(rehypeparse, options.rehypeoptions);
  return annotatedtext.build(text, processor.parse, options);
}

export {
  build,
  defaults,
};
