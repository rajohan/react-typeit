import React from "react";
import ReactSVG from "react-svg";

const Emoticons = (props) => {
    const {imgRoot, icons} = props.config.emoticons;

    // Convert icons array to html img elements
    const emoticons = icons.map(emoticon => (
        <ReactSVG
            src={imgRoot + emoticon + ".svg"}
            key={emoticon}
            svgClassName="text-editor__emoticons__icon"
            onClick={() => props.onEmoticonClick(emoticon)}
        />
    ));

    return (
        <div className="toolbox__emoticons__box text-editor__toolbox__emoticons__box">
            <div className="toolbox__emoticons__box__close text-editor__toolbox__emoticons__box__close"
                 onClick={props.onClick}>
                x
            </div>
            {emoticons}
        </div>
    )
};

export default Emoticons