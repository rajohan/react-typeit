import {
    createSlatePluginsOptions,
    ELEMENT_BLOCKQUOTE,
    ELEMENT_CODE_BLOCK,
    ELEMENT_TD,
    SoftBreakPluginOptions,
} from "@udecode/slate-plugins";

const options = createSlatePluginsOptions();

export const optionsSoftBreak: SoftBreakPluginOptions = {
    rules: [
        { hotkey: "shift+enter" },
        {
            hotkey: "enter",
            query: {
                allow: [
                    options[ELEMENT_CODE_BLOCK].type,
                    options[ELEMENT_BLOCKQUOTE].type,
                    options[ELEMENT_TD].type,
                ],
            },
        },
    ],
};
