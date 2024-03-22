import * as annotatedtext from "annotatedtext";
import * as rehypeparse from "rehype-parse";

/**
 * @interface IOptions
 * @property {rehypeparse.Options} rehypeoptions The options to use for parsing
 * the HTML.
 * @property {function} children A function that returns the children of a node.
 * @property {function} annotatetextnode A function that returns an annotated
 *  text node.
 * @property {function} interpretmarkup A function that returns a string
 *  representing how markup should be interpreted.
 */
export interface IOptions {
  rehypeoptions: rehypeparse.Options;
  children(node: annotatedtext.INode): annotatedtext.INode[];
  annotatetextnode(
    node: annotatedtext.INode,
    text: string,
  ): annotatedtext.IAnnotation | null;
  interpretmarkup(text?: string): string;
}

export const defaults: IOptions;

export function collecttextnodes(
  ast: unknown,
  text: string,
  options?: IOptions,
): annotatedtext.IAnnotation[];

export function composeannotation(
  text: string,
  annotatedtextnodes: annotatedtext.IAnnotatedtext,
  options?: IOptions,
): annotatedtext.IAnnotatedtext;

export function build(
  text: string,
  parse: unknown,
  options?: IOptions,
): annotatedtext.IAnnotatedtext;
