/**
 * @module annotatedtext-rehype
 * @example
 * import { build } from "annotatedtext-rehype";
 *
 * const text = "<p>Some <b>bold</b> text.</p>";
 * const annotatedtext = build(text);
 * const ltdata = JSON.stringify(annotatedtext);
 *
 * @description
 * This module provides a function to build an annotated text from a HTML
 * string using the rehype parser.
 */

import * as annotatedtext from "annotatedtext";
import * as rehypeparse from "rehype-parse";

/**
 * @property {rehypeparse.Options} rehypeoptions The options to use for parsing
 * the HTML.
 * @property {function} children A function that returns the children of a node.
 * @property {function} annotatetextnode A function that returns an annotated
 *  text node.
 * @property {function} interpretmarkup A function that returns a string
 *  representing how markup should be interpreted.
 * @interface
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
export const defaults: IOptions;

/**
 * Collect text nodes from an AST.
 *
 * @deprecated
 *
 * This function was never meant to be used directly. It is in the underlying
 * annotatedtext module and is used by the `build` function.
 *
 * @function collecttextnodes
 * @param ast The AST to collect text nodes from.
 * @param text The text that the AST was generated from.
 * @param options The options to use.
 * @returns The text nodes.
 */
export function collecttextnodes(
  ast: unknown,
  text: string,
  options?: IOptions,
): annotatedtext.IAnnotation[];

/**
 * Compose an annotated text from a text string and an array of text nodes.
 *
 * @deprecated
 *
 * This function was never meant to be used directly. It is in the underlying
 * annotatedtext module and is used by the `build` function.
 *
 * @function compose
 * @param text The text string.
 * @param annotatedtextnodes The text nodes.
 * @param options The options to use.
 * @returns The annotated text.
 */
export function composeannotation(
  text: string,
  annotatedtextnodes: annotatedtext.IAnnotatedtext,
  options?: IOptions,
): annotatedtext.IAnnotatedtext;

/**
 * Build an annotated text from a HTML string using the rehype parser.
 * @function build
 * @param text The HTML string to parse.
 * @param options The options to use.
 * @returns The annotated text.
 */
export function build(
  text: string,
  parse: unknown,
  options?: IOptions,
): annotatedtext.IAnnotatedtext;
