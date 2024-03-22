import * as annotatedtext from "annotatedtext";
import rehypeparse from "rehype-parse";
import { unified } from "unified";
import { IOptions } from "../types";

/**
 * @module annotatedtext-rehype
 * @description
 * This module provides a function to build an annotated text from a HTML
 * string using the rehype parser.
 *
 * @example
 * import { build } from "annotatedtext-rehype";
 *
 * const text = "<p>Some <b>bold</b> text.</p>";
 * const annotatedtext = build(text);
 * const ltdata = JSON.stringify(annotatedtext);
 *
 */

/**
 * Default options for building annotated text.
 * @constant defaults
 *
 * @property {function} children A function that returns the children of a node.
 * @property {function} annotatetextnode A function that returns an annotation
 *  for a text node.
 * @property {function} interpretmarkup A function that returns a string to use
 *  as the `interpretAs` property of an annotation.
 */
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

/**
 * Build an annotated text from a HTML string using the rehype parser.
 * @function build
 * @param text The HTML string to parse.
 * @param options The options to use.
 * @returns The annotated text.
 */
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
