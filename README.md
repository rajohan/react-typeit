# React-TypeIt

[![](https://img.shields.io/npm/v/react-typeit.svg?style=flat)](https://www.npmjs.com/package/react-typeit)
[![](https://img.shields.io/npm/dt/react-typeit.svg?style=flat)](https://www.npmjs.com/package/react-typeit)
[![](https://img.shields.io/bundlephobia/min/react-typeit.svg?style=flat)](https://www.npmjs.com/package/react-typeit)
[![](https://img.shields.io/npm/l/react-typeit.svg?style=flat)](https://mit-license.org/)
[![](https://img.shields.io/snyk/vulnerabilities/npm/react-typeit.svg?style=flat)](https://snyk.io/vuln/search?q=react-typeit&type=npm)
[![](https://img.shields.io/npm/dependency-version/react-typeit/peer/react.svg?style=flat)](https://www.npmjs.com/package/react)
[![](https://img.shields.io/npm/dependency-version/react-typeit/peer/react-dom.svg?style=flat)](https://www.npmjs.com/package/react-dom)

A simple lightweight WYSIWYG editor

**DEMO:** [https://rajohan.no/typeit](https://rajohan.no/typeit)

## Installation
```
$ npm i react-typeit
```

## Getting Started
```javascript
import TypeIt from "react-typeit";
import "react-typeit/build/styles.min.css"
```
**Note:** For the editor icons to work copy the "images" folder from /node_modules/react-typeit/build/ to your project's public path.
The images needs to resolve on YOUR_SERVER/images/react-typeit

## Use the component

To use the component simply render it
```javascript
<TypeIt />
```

#### Props
`onChange(content)` : Returns the new content of the editor after change.<br>
`config(yourConfig)` : Pass your own config to the editor<br>

#### Examples
```javascript
import TypeItConfig from "./myConfig";

<TypeIt 
    onChange={content => console.log(content)}
    config={TypeItConfig} 
/>
```

#### Config
If you want to change some of the appearance or functionality of the editor you can pass it
your own config. For now you will have to redefine the whole config object, 
this will be made easier on a later point.

`toolbar.imgRoot` : root directory for the toolbar icons<br>
`toolbar.tools` : Array of toolbar tools. Each array inside the root array will create 
a new "group" of tools that gets separated with a border right from the next toolbar group.<br>
`emoticons.imgRoot` : root directory for the emoticon icons<br>
`emoticons.icons` : available emoticon icons

**Note**
1. toolbar.tools and toolbar.icons names need to be equal to the image name in your imgRoot (without the file extension)
2. Only SVG icons are supported as they are injected to the html with [react-svg](https://www.npmjs.com/package/react-svg)

**Default config**

```javascript
const config = {
    toolbar: {
        imgRoot: "images/react-typeit/",
        tools: [
            ["bold", "italic", "underline", "strikethrough"],
            ["header1", "header2"],
            ["quote", "code", "horizontalRule"],
            ["listUnordered", "listOrdered"],
            ["alignLeft", "alignCenter", "alignRight", "alignJustify"],
            ["indent", "outdent"],
            ["link", "image"],
            ["emoticon", "formatClear"],
            ["source"]
        ]
    },
    emoticons: {
        imgRoot: "images/react-typeit/emoticons/",
        icons: [
            "smile", "wink", "tongue", "grin", "laugh", "frowny", "unsure", "cry", 
            "grumpy", "angry", "astonished", "afraid", "nerd", "dejected", "bigEyes", 
            "sunglasses", "confused", "silent", "love", "kiss"
        ]
    }

};

export default config;
```

## Support
__Bugs and requests__: submit them through the project's issues tracker.

[![Issues](http://img.shields.io/github/issues/rajohan/react-typeit.svg)](https://github.com/rajohan/react-typeit/issues)

## License and author info
Released under the [MIT] License.<br>
Authored and maintained by Raymond Johannessen.

> [rajohan.no](https://rajohan.no) &nbsp;&middot;&nbsp;
> GitHub [@rajohan](https://github.com/rajohan) &nbsp;&middot;&nbsp;
> Twitter [@rajohan](https://twitter.com/rajohan)

[MIT]: http://mit-license.org/
