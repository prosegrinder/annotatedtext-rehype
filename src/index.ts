import * as annotatedtext from "annotatedtext";
import rehypeparse from "rehype-parse";
import { unified } from "unified";
import { IOptions } from "../types";

const defaults = {
  children(node: annotatedtext.INode): annotatedtext.INode[] {
    return annotatedtext.defaults.children(node);
  },
  annotatetextnode(
    node: annotatedtext.INode,
    text: string,
  ): annotatedtext.IAnnotation | null {
    return annotatedtext.defaults.annotatetextnode(node, text);
  },
  interpretmarkup(text = ""): string {
    const countP = (text.match(/<\/p>/g) || []).length;
    const countH = (text.match(/<\/h\d+>/g) || []).length;
    const countBr = (text.match(/<br[\s/]*>/g) || []).length;
    const coungNl = (text.match(/\n/g) || []).length;
    return "\n".repeat(2 * countP + 2 * countH + countBr + coungNl);
  },
  rehypeoptions: {
    emitParseErrors: false,
  },
};

function build(
  text: string,
  options: IOptions = defaults,
): annotatedtext.IAnnotatedtext {
  const nodes = unified()
    .use(rehypeparse, options.rehypeoptions)
    .parse(text) as annotatedtext.INode;
  return annotatedtext.compose(text, nodes, options);
}

export { build, defaults };
