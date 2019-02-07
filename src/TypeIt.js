import React, {useEffect, useRef, useState} from "react";

import defaultConfig from "./config";
import "./styles/styles.scss";
import Toolbar from "./Toolbar";

const TypeIt = props => {

    const {config} = props;
    const editor = useRef();

    const [content, setContent] = useState("");
    const [showSourceCode, toggleShowSourceCode] = useState(false);
    const [showEmoticonBox, toggleShowEmoticonBox] = useState(false);
    const [sourceCode, setSourceCode] = useState("");
    const [toolbarState, setToolbarState] = useState({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        listUnordered: false,
        listOrdered: false,
        alignLeft: true,
        alignCenter: false,
        alignRight: false,
        alignJustify: false,
        header1: false,
        source: false
    });

    // Assign event handlers
    useEffect(() => {
        editor.current.addEventListener("paste", pasteHandler, false);
        editor.current.addEventListener("focus", placeHolderHide, false);
        editor.current.addEventListener("blur", placeHolderShow, false);
        editor.current.addEventListener("click", handleToolbarState,false);
        editor.current.addEventListener("keydown", handleToolbarState,false);

        return () => {
            editor.current.removeEventListener("paste", pasteHandler, false);
            editor.current.removeEventListener("focus", placeHolderHide, false);
            editor.current.removeEventListener("blur", placeHolderShow, false);
            editor.current.removeEventListener("click", handleToolbarState,false);
            editor.current.removeEventListener("keydown", handleToolbarState,false);
        }
    }, []);

    useEffect(() => {
       props.onChange(content);
    }, [content]);

    // Placeholder toggle handler
    let placeholder;

    const placeHolderHide = () => {
        placeholder = editor.current.getAttribute("data-placeholder");
        editor.current.setAttribute("data-placeholder", "");
    };

    const placeHolderShow = () => {
        editor.current.setAttribute("data-placeholder", placeholder);
    };

    //Paste handler
    const pasteHandler = event => {
        event.preventDefault();
        const text = event.clipboardData.getData("text");
        document.execCommand("insertText", false, text);
    };

    const handleToolbarClick = (toolbarButton) => {
        let selection = document.getSelection();
        let text = selection.toString() ? selection.toString() : "&#8203;"; // &#8203; = invisible space
        let url = "";

        editor.current.focus();

        switch (toolbarButton) {
            case "bold":
                setToolbarState(prevState => ({...prevState, bold: !prevState.bold}));
                return document.execCommand("bold", false, null);
            case "italic":
                setToolbarState(prevState => ({...prevState, italic: !prevState.italic}));
                return document.execCommand("italic", false, null);
            case "underline":
                setToolbarState(prevState => ({...prevState, underline: !prevState.underline}));
                return document.execCommand("underline", false, null);
            case "strikethrough":
                setToolbarState(prevState => ({...prevState, strikethrough: !prevState.strikethrough}));
                return document.execCommand("strikethrough", false, null);
            case "header1":
                return document.execCommand("insertHTML", false, `<h1>${text}</h1>`);
            case "header2":
                return document.execCommand("insertHTML", false, `<h2>${text}</h2>`);
            case "quote":
                return document.execCommand("insertHTML", false, `<blockquote>${text}</blockquote>`);
            case "code":
                return document.execCommand("insertHTML", false, `<pre>${text}</pre>`);
            case "horizontalRule":
                return document.execCommand("insertHorizontalRule", false, null);
            case "listUnordered":
                return document.execCommand("insertUnorderedList", false, null);
            case "listOrdered":
                return document.execCommand("insertOrderedList", false, null);
            case "alignLeft":
                return document.execCommand("justifyLeft", false, null);
            case "alignCenter":
                return document.execCommand("justifyCenter", false, null);
            case "alignRight":
                return document.execCommand("justifyRight", false, null);
            case "alignJustify":
                return document.execCommand("justifyFull", false, null);
            case "indent":
                return document.execCommand("indent", false, null);
            case "outdent":
                return document.execCommand("outdent", false, null);
            case "link":
                url = prompt("Enter your URL:", "https://");
                text = selection.toString() ? selection.toString() : url;

                if (url === null || url === "" || url === "http://" || url === "https://") {
                    return;
                }

                return document.execCommand("insertHTML", false, `<a href='${url}'>${text}</a>`);
            case "image":
                url = prompt("Enter Image URL:", "https://");

                if (url === null || url === "" || url === "http://" || url === "https://") {
                    return;
                }

                return document.execCommand("insertHTML", false,
                    `<div class="text-editor__image__box"><img src="${url}" alt="" /></div>`
                );
            case "formatClear":
                return document.execCommand("removeFormat", false, null);
            case "emoticon":
                return toggleShowEmoticonBox(prevState => !prevState);
            case "source":
                setToolbarState(prevState => ({...prevState, source: !prevState.source}));
                return toggleShowSourceCode(prevState => !prevState);
            default:
                return console.log(toolbarButton + " is not a supported button");
        }
    };

    const onEmoticonClick = emoticon => {
        editor.current.focus();
        toggleShowEmoticonBox(false);

        document.execCommand("insertHTML", false,
            `<img src="${config.emoticons.imgRoot}${emoticon}.svg" class="text-editor__box__emoticon" alt="" />`);
    };

    const handleToolbarState = () => {
        setToolbarState(prevState => ({
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
            underline: document.queryCommandState("underline"),
            strikethrough: document.queryCommandState("strikethrough"),
            listUnordered: document.queryCommandState("insertUnorderedList"),
            listOrdered: document.queryCommandState("insertOrderedList"),
            alignLeft: document.queryCommandState("justifyLeft"),
            alignCenter: document.queryCommandState("justifyCenter"),
            alignRight: document.queryCommandState("justifyRight"),
            alignJustify: document.queryCommandState("justifyFull"),
            header1: isChildOfTag("H1"),
            header2: isChildOfTag("H2"),
            source: prevState.source
        }))
    };

    const isChildOfTag = tag => {
        let currentNode = window.getSelection().getRangeAt(0).commonAncestorContainer;
        let isChild = false;

        // Loop through DOM tree in the editor, stop at text-editor root div if tag not found
        while(currentNode.parentNode && currentNode.parentNode.className !== "text-editor") {
            // Tag found isChildOfTag is true
            if(currentNode.nodeName && currentNode.nodeName === tag) {
                isChild = true;
                break;
            }
            currentNode = currentNode.parentNode;
        }

        return isChild;
    };

    const handleChange = () => {
        handleToolbarState();
        setContent(editor.current.innerHTML);
        setSourceCode(editor.current.innerHTML);
    };

    return (
        <div className="text-editor">
            <Toolbar
                config={config}
                onClick={(toolbarButton) => handleToolbarClick(toolbarButton)}
                showEmoticonBox={showEmoticonBox}
                toggleShowEmoticonBox={() => toggleShowEmoticonBox(prevState => !prevState)}
                onEmoticonClick={emoticon => onEmoticonClick(emoticon)}
                toolbarState={toolbarState}
            />
            <div className="text-editor__box" data-placeholder="Your text..." contentEditable="true"
                 onInput={handleChange} ref={editor}>
            </div>
            {showSourceCode && <div className="text-editor__code-heading">Source code</div>}
            {showSourceCode && <div className="text-editor__code">{sourceCode}</div>}
            <div className="text-editor__status u-margin-bottom-small" />
        </div>
    );
};

TypeIt.defaultProps = {
    onChange: () => {},
    config: defaultConfig
};

export default TypeIt;