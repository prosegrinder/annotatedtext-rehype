import * as annotatedtext from "annotatedtext";

declare module annotatedtextrehype {
  export interface IOptions {
    children(node: any): any;
    annotatetextnode(node: any, text: string): annotatedtext.IAnnotation | null;
    interpretmarkup(text?: string): string;
    rehypeoptions: any;
  }

  export const defaults: IOptions;

  export function collecttextnodes(
    ast: any,
    text: string,
    options?: IOptions
  ): any[];

  export function composeannotation(
    text: string,
    annotatedtextnodes: annotatedtext.IAnnotatedtext,
    options?: IOptions
  ): annotatedtext.IAnnotatedtext;

  export function build(
    text: string,
    parse: any,
    options?: IOptions
  ): annotatedtext.IAnnotatedtext;
}

export = annotatedtextrehype;
