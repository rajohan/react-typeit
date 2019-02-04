import React from "react";
import ReactDOM from "react-dom";

import TypeIt from "./TypeIt";
import config from "./config";

const Root = () => {
    return(
        <TypeIt
            onChange={content => console.log(content)}
            config={config}
        />
    );
};

ReactDOM.render(<Root/>, document.getElementById("root"));