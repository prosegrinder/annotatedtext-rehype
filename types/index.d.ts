import * as annotatedtext from "annotatedtext";
import * as rehypeparse from "rehype-parse";

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
