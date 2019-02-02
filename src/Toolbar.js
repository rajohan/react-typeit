import ReactSVG from "react-svg";
import React from "react";

import Emoticons from "./Emoticons";

const Toolbar = props => {
    const {imgRoot, tools} = props.config.toolbar;

    // Convert toolbar arrays to html img elements
    const convertToImg = tools.map(key => key.map(toolbarButton => {
            // Render icons from emoticons array and tool icon if tool key is emoticon
            if (toolbarButton === "emoticon") {
                return (
                    <div className="text-editor__toolbox__emoticons__box__wrapper" key="emoticon">
                        <ReactSVG
                            src={imgRoot + toolbarButton + ".svg"} key={toolbarButton}
                            svgClassName="text-editor__toolbox__icon"
                            onClick={() => props.onClick(toolbarButton)}
                        />
                        {props.showEmoticonBox &&
                        <Emoticons
                            config={props.config}
                            onEmoticonClick={(emoticon) => props.onEmoticonClick(emoticon)}
                            onClick={props.toggleShowEmoticonBox}
                        />}
                    </div>
                )
            } else { // Render only tool icon
                return (
                    <ReactSVG src={imgRoot + toolbarButton + ".svg"} key={toolbarButton}
                              svgClassName="text-editor__toolbox__icon" onClick={() => props.onClick(toolbarButton)} />
                );
            }
        })
    );

    // Reduce array from 2d to 1d and add separator div's
    let concatWithSeparator = [];
    for (let i = 0; i < convertToImg.length; i++) {
        concatWithSeparator = concatWithSeparator.concat(convertToImg[i]);

        // Add separator if its not last elm in array
        i + 1 !== convertToImg.length && concatWithSeparator.push(
            <div className="text-editor__toolbox__separator" key={"sep-" + i} />
        );
    }

    return (
        <div className="text-editor__toolbox u-margin-top-small">
            {concatWithSeparator}
        </div>
    );
};

export default Toolbar;