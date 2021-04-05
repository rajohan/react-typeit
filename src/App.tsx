import "react-dropdown/style.css";
import "tippy.js/dist/tippy.css";

import Tippy from "@tippyjs/react";
import {
    addColumn,
    addRow,
    createAlignPlugin,
    createAutoformatPlugin,
    createBlockquotePlugin,
    createBoldPlugin,
    createCodeBlockPlugin,
    createCodePlugin,
    createDeserializeHTMLPlugin,
    createExitBreakPlugin,
    createHeadingPlugin,
    createHistoryPlugin,
    createImagePlugin,
    createItalicPlugin,
    createLinkPlugin,
    createListPlugin,
    createMediaEmbedPlugin,
    createNodeIdPlugin,
    createParagraphPlugin,
    createReactPlugin,
    createResetNodePlugin,
    createSelectOnBackspacePlugin,
    createSlatePluginsComponents,
    createSlatePluginsOptions,
    createSoftBreakPlugin,
    createStrikethroughPlugin,
    createTablePlugin,
    createTodoListPlugin,
    createTrailingBlockPlugin,
    createUnderlinePlugin,
    deleteColumn,
    deleteRow,
    deleteTable,
    ELEMENT_ALIGN_CENTER,
    ELEMENT_ALIGN_RIGHT,
    ELEMENT_BLOCKQUOTE,
    ELEMENT_CODE_BLOCK,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6,
    ELEMENT_IMAGE,
    ELEMENT_OL,
    ELEMENT_PARAGRAPH,
    ELEMENT_TABLE,
    ELEMENT_TODO_LI,
    ELEMENT_UL,
    HeadingToolbar,
    insertTable,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    SlatePlugin,
    SlatePlugins,
    someNode,
    StyledElementProps,
    TDescendant,
    toggleNodeType,
    ToolbarAlign,
    ToolbarCodeBlock,
    ToolbarElement,
    ToolbarImage,
    ToolbarLink,
    ToolbarList,
    ToolbarMark,
    ToolbarTable,
    useSlatePluginType,
    useTSlate,
} from "@udecode/slate-plugins";
import React, { useMemo, useState } from "react";
import Dropdown, { Option } from "react-dropdown";
import {
    AiOutlineDeleteColumn,
    AiOutlineDeleteRow,
    AiOutlineInsertRowBelow,
    AiOutlineInsertRowRight,
    BiCode,
    BiCodeBlock,
    CgExtensionRemove,
    FaAlignCenter,
    FaAlignLeft,
    FaAlignRight,
    FaBold,
    FaImage,
    FaItalic,
    FaLink,
    FaListOl,
    FaListUl,
    FaQuoteRight,
    FaStrikethrough,
    FaTable,
    FaTasks,
    FaUnderline,
} from "react-icons/all";

import { optionsAutoformat } from "./configs/autoformatRules";
import { optionsExitBreak } from "./configs/exitBreak";
import { optionsResetNode } from "./configs/resetNode";
import { optionsSoftBreak } from "./configs/softBreak";

// const TableToolbar: React.FC = () => {
//     const editor = useTSlate();
//     const ref = useRef<HTMLDivElement>(null);
//
//     const isActive = someNode(editor, { match: { type: ELEMENT_TABLE } });
//     const domSelection = window.getSelection();
//     const domRange =
//         domSelection && domSelection.rangeCount > 0 && domSelection.getRangeAt(0);
//     const rect = domRange && domRange.getBoundingClientRect();
//
//     useEffect(() => {
//         if (ref.current && isActive) {
//             if (!domSelection || !domRange || !rect) return;
//
//             ref.current.style.top = `${rect.top - ref.current.offsetHeight}px`;
//         }
//     }, [isActive, domSelection, domRange, rect]);
//
//     return (
//         <div
//             style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 position: "absolute",
//                 visibility: isActive ? "visible" : "hidden",
//                 zIndex: 100,
//                 left: "50%",
//                 transform: "translateX(-50%)",
//             }}
//             ref={ref}
//         >
//             <ToolbarTable
//                 icon={<CgExtensionRemove />}
//                 transform={deleteTable}
//                 tooltip={{ content: "Delete Table" }}
//             />
//             <ToolbarTable
//                 icon={<AiOutlineInsertRowBelow />}
//                 transform={addRow}
//                 tooltip={{ content: "Insert Row" }}
//             />
//             <ToolbarTable
//                 icon={<AiOutlineDeleteRow />}
//                 transform={deleteRow}
//                 tooltip={{ content: "Delete Row" }}
//             />
//             <ToolbarTable
//                 icon={<AiOutlineInsertRowRight />}
//                 transform={addColumn}
//                 tooltip={{ content: "Insert Column" }}
//             />
//             <ToolbarTable
//                 icon={<AiOutlineDeleteColumn />}
//                 transform={deleteColumn}
//                 tooltip={{ content: "Delete Column" }}
//             />
//         </div>
//     );
// };

const Table = ({ attributes, children, className, nodeProps }: StyledElementProps) => {
    const editor = useTSlate();

    const isActive = someNode(editor, { match: { type: ELEMENT_TABLE } });

    return (
        <div>
            <Tippy
                interactive={true}
                arrow={false}
                // hideOnClick={false}
                // showOnCreate={true}
                // trigger="click focus"
                visible={isActive}
                onClickOutside={(instance) => instance.hide()}
                content={
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <ToolbarTable
                            icon={<CgExtensionRemove />}
                            transform={deleteTable}
                            tooltip={{ content: "Delete Table" }}
                        />
                        <ToolbarTable
                            icon={<AiOutlineInsertRowBelow />}
                            transform={addRow}
                            tooltip={{ content: "Insert Row" }}
                        />
                        <ToolbarTable
                            icon={<AiOutlineDeleteRow />}
                            transform={deleteRow}
                            tooltip={{ content: "Delete Row" }}
                        />
                        <ToolbarTable
                            icon={<AiOutlineInsertRowRight />}
                            transform={addColumn}
                            tooltip={{ content: "Insert Column" }}
                        />
                        <ToolbarTable
                            icon={<AiOutlineDeleteColumn />}
                            transform={deleteColumn}
                            tooltip={{ content: "Delete Column" }}
                        />
                    </div>
                }
            >
                <table {...attributes} className={className} {...nodeProps}>
                    <tbody>{children}</tbody>
                </table>
            </Tippy>
        </div>
    );
};

const components = createSlatePluginsComponents({
    // customize your components by plugin key
    [ELEMENT_TABLE]: Table,
});
const options = createSlatePluginsOptions({
    // customize your options by plugin key
});

const initialValue = [
    {
        type: options[ELEMENT_PARAGRAPH].type,
        children: [{ text: "" }],
    },
];

const dropdownOptions = [
    { label: "Paragraph", value: ELEMENT_PARAGRAPH },
    { label: "Heading 1", value: ELEMENT_H1 },
    { label: "Heading 2", value: ELEMENT_H2 },
    { label: "Heading 3", value: ELEMENT_H3 },
    { label: "Heading 4", value: ELEMENT_H4 },
    { label: "Heading 5", value: ELEMENT_H5 },
    { label: "Heading 6", value: ELEMENT_H6 },
];

const ToolbarButtonsBasicElements = () => {
    const editor = useTSlate();

    const activeNode = dropdownOptions.find((option) =>
        someNode(editor, { match: { type: option.value } })
    );

    const onDropdownChange = (option: Option) => {
        toggleNodeType(editor, {
            activeType: option.value,
            inactiveType: ELEMENT_PARAGRAPH,
        });
    };

    return (
        <>
            <Tippy content="Heading">
                <div onMouseDown={(event) => event.preventDefault()}>
                    <Dropdown
                        options={dropdownOptions}
                        value={activeNode || dropdownOptions[0]}
                        onChange={onDropdownChange}
                    />
                </div>
            </Tippy>
            <ToolbarElement
                type={useSlatePluginType(ELEMENT_BLOCKQUOTE)}
                icon={<FaQuoteRight />}
                tooltip={{ content: "Quote (Ctrl+Shift+.)" }}
            />
            <ToolbarList
                type={useSlatePluginType(ELEMENT_UL)}
                icon={<FaListUl />}
                tooltip={{ content: "Bulleted List" }}
            />
            <ToolbarList
                type={useSlatePluginType(ELEMENT_OL)}
                icon={<FaListOl />}
                tooltip={{ content: "Numbered List" }}
            />
            <ToolbarElement
                type={useSlatePluginType(ELEMENT_TODO_LI)}
                icon={<FaTasks />}
                tooltip={{ content: "Todo List" }}
            />
            <ToolbarAlign icon={<FaAlignLeft />} tooltip={{ content: "Align Left" }} />
            <ToolbarAlign
                type={useSlatePluginType(ELEMENT_ALIGN_CENTER)}
                icon={<FaAlignCenter />}
                tooltip={{ content: "Align Center" }}
            />
            <ToolbarAlign
                type={useSlatePluginType(ELEMENT_ALIGN_RIGHT)}
                icon={<FaAlignRight />}
                tooltip={{ content: "Align Right" }}
            />
            <ToolbarMark
                type={useSlatePluginType(MARK_BOLD)}
                icon={<FaBold />}
                tooltip={{ content: "Bold (Ctrl+B)" }}
            />
            <ToolbarMark
                type={useSlatePluginType(MARK_ITALIC)}
                icon={<FaItalic />}
                tooltip={{ content: "Italic (Ctrl+I)" }}
            />
            <ToolbarMark
                type={useSlatePluginType(MARK_STRIKETHROUGH)}
                icon={<FaStrikethrough />}
                tooltip={{ content: "Strikethrough (Ctrl+Shift+S)" }}
            />
            <ToolbarMark
                type={useSlatePluginType(MARK_UNDERLINE)}
                icon={<FaUnderline />}
                tooltip={{ content: "Underline (Ctrl+U)" }}
            />
            <ToolbarTable
                icon={<FaTable />}
                transform={insertTable}
                tooltip={{ content: "Insert Table" }}
            />
            <ToolbarLink icon={<FaLink />} tooltip={{ content: "Link" }} />
            <ToolbarImage icon={<FaImage />} tooltip={{ content: "Image" }} />
            <ToolbarMark
                type={useSlatePluginType(MARK_CODE)}
                icon={<BiCode />}
                tooltip={{ content: "Code (Ctrl+E)" }}
            />
            <ToolbarCodeBlock
                type={useSlatePluginType(ELEMENT_CODE_BLOCK)}
                icon={<BiCodeBlock />}
                tooltip={{ content: "Code Block (Ctrl+Shift+8)" }}
            />
        </>
    );
};

const App: React.FC = () => {
    const [value, setValue] = useState<TDescendant[]>(initialValue);

    const plugins: SlatePlugin[] = useMemo(() => {
        const pluginsArray = [
            createReactPlugin(),
            createHistoryPlugin(),
            createParagraphPlugin(),
            createBlockquotePlugin(),
            createTodoListPlugin(),
            createHeadingPlugin(),
            createImagePlugin(),
            createLinkPlugin(),
            createListPlugin(),
            createTablePlugin(),
            createMediaEmbedPlugin(),
            createCodeBlockPlugin(),
            createAlignPlugin(),
            createBoldPlugin(),
            createCodePlugin(),
            createItalicPlugin(),
            createUnderlinePlugin(),
            createStrikethroughPlugin(),
            createNodeIdPlugin(),
            createAutoformatPlugin(optionsAutoformat),
            createResetNodePlugin(optionsResetNode),
            createSoftBreakPlugin(optionsSoftBreak),
            createExitBreakPlugin(optionsExitBreak),
            createTrailingBlockPlugin({
                type: options[ELEMENT_PARAGRAPH].type,
                level: 0,
            }),
            createSelectOnBackspacePlugin({ allow: options[ELEMENT_IMAGE].type }),
        ];

        pluginsArray.push(createDeserializeHTMLPlugin({ plugins: pluginsArray }));

        return pluginsArray;
    }, []);

    return (
        <SlatePlugins
            id="React-TypeIt"
            components={components}
            options={options}
            plugins={plugins}
            editableProps={{
                placeholder: "Enter some rich text…",
                spellCheck: true,
                autoFocus: true,
            }}
            value={value}
            onChange={(value) => setValue(value)}
        >
            <HeadingToolbar>
                <ToolbarButtonsBasicElements />
            </HeadingToolbar>
            <button onClick={() => console.log(value)}>Test</button>
        </SlatePlugins>
    );
};

export default App;
