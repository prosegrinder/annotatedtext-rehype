# annotatedtext-rehype

[![Node.js CI](https://github.com/prosegrinder/annotatedtext-rehype/actions/workflows/npm-ci.yaml/badge.svg?branch=main)](https://github.com/prosegrinder/annotatedtext-rehype/actions/workflows/npm-ci.yaml)

A lightweight JavaScript library based on
[annotatedtext](https://github.com/prosegrinder/annotatedtext) and
[rehype-parse](https://github.com/rehypejs/rehype/tree/main/packages/rehype-parse)
for converting HTML documents into an annotated text format consumable by
LanguageTool as
[AnnotatedText](https://languagetool.org/development/api/org/languagetool/markup/AnnotatedText.html).

## Documentation

For details, please see
[https://www.prosegrinder.com/annotatedtext-rehype](https://www.prosegrinder.com/annotatedtext-rehype).

## Install

**This package is
[ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).**
Node 12+ is needed to use it, and it must be `import`ed instead of `require`d.

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install annotatedtext-rehype --save
```

## Usage

Use `build` to convert valid HTML into
[AnnotatedText](https://languagetool.org/development/api/org/languagetool/markup/AnnotatedText.html).

```javascript
import { build } from "annotatedtext-rehype";

const text = "<p>Some <b>bold</b> text.</p>";
const annotatedtext = build(text);
const ltdata = JSON.stringify(annotatedtext);
```
