import React from "react";
import ReactDOM from "react-dom";

import TextEditor from "./TextEditor";

const TypeIt = props => <TextEditor {...props}/>;

ReactDOM.render(<TypeIt/>, document.getElementById("root"));