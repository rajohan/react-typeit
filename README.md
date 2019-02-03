## React Type It

[![](https://img.shields.io/npm/v/react-typeit.svg?style=flat)](https://www.npmjs.com/package/react-typeit)
[![](https://img.shields.io/npm/dt/react-typeit.svg?style=flat)](https://www.npmjs.com/package/react-typeit)
![](https://img.shields.io/bundlephobia/min/react-typeit.svg?style=flat)
![](https://img.shields.io/npm/l/react-typeit.svg?style=flat)
![](https://img.shields.io/snyk/vulnerabilities/npm/react-typeit.svg?style=flat)
[![](https://img.shields.io/node/v/react-typeit.svg?style=flat)](https://nodejs.org/)
[![](https://img.shields.io/npm/dependency-version/react-typeit/peer/react.svg?style=flat)](https://www.npmjs.com/package/react)
[![](https://img.shields.io/npm/dependency-version/react-typeit/peer/react-dom.svg?style=flat)](https://www.npmjs.com/package/react-dom)

A simple lightweight WYSIWYG editor

**DEMO:** [https://rajohan.no/typeit](https://rajohan.no/typeit)

```javascript
import TypeIt from "react-typeit";
import "react-typeit/build/styles.min.css"
```
**IMPORTANT:** For the editor icons to work copy the "images" folder from /node_modules/react-typeit/build/ to your project's public path.
The images needs to resolve on YOUR_SERVER/images/react-typeit

To get the editors content use the onChange prop
```javascript
<TypeIt onChange={content => console.log(content)} />
```
Support
-------

__Bugs and requests__: submit them through the project's issues tracker.<br>
[![Issues](http://img.shields.io/github/issues/rajohan/react-typeit.svg)](https://github.com/rajohan/react-typeit/issues)
