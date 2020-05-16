# annotatedtext-rehype

[![Node.js CI](https://github.com/prosegrinder/annotatedtext-rehype/workflows/Node.js%20CI/badge.svg?branch=master)](https://github.com/prosegrinder/annotatedtext-rehype/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/3a7d5bc703d0410cbe00d48eaed7a299)](https://www.codacy.com/gh/prosegrinder/annotatedtext-rehype?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=prosegrinder/annotatedtext-rehype&amp;utm_campaign=Badge_Grade)

A lightweight JavaScript library based on [annotatedtext](https://github.com/prosegrinder/annotatedtext) and
[rehype-parse](https://github.com/rehypejs/rehype/tree/master/packages/rehype-parse) for
converting html documents into an annotated text format consumable by
LanguageTool as [AnnotatedText](https://languagetool.org/development/api/org/languagetool/markup/AnnotatedText.html).

## Usage

### `build(text, parse, options = defaults)`

Returns Annotated Text as described by LanguageTool's API:

```json
{"annotation":[
 {"text": "A "},
 {"markup": "<b>"},
 {"text": "test"},
 {"markup": "</b>"}
]}
```

Run the object through `JSON.stringfy()` to get a string suitable
for passing to LanguageTool's `data` parameter.

```js
"use strict";

var builder = require("annotatedtext-rehype");

const annotatedtext = builder.build(text);
var ltdata = JSON.stringify(annotatedtext);
```

* `text`: The text from the html document in its original form.
* _`options`_: (optional) See [`defaults`](#defaults).

### `defaults`

`annotatedtext-rehype` uses following default functions used throughout.

```js
const defaults = {
  children(node) {
    return annotatedtext.defaults.children(node);
  },
  annotatetextnode(node) {
    return annotatedtext.defaults.annotatetextnode(node);
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
```

Functions can be overriden by making a copy and assigning a new function.

#### `children(node)`

Expected to return an array of child nodes.

#### `annotatetextnode(node)`

Expected to return a structure for a text ast node with at least the following:

* `text` is the natural language text from the node, devoid of all markup.
* `offset` contains offsets used to extract markup text from the original document.
  * `start` is the offset start of the text
  * `end` is the offset end of the text

```json
{
  "text": "A snippet of the natural language text from the document.",
  "offset": {
    "start": 1,
    "end": 57
  }
}
```

If the node is not a text node, it must return `null`;

#### `interpretmarkup(node)`

Used to make sure LanguageTool knows when markup represents some form of whitespace.

## License

[MIT](LICENSE)
