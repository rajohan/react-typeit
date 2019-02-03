## React Type It

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
