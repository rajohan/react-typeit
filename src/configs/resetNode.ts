import {
    createSlatePluginsOptions,
    ELEMENT_BLOCKQUOTE,
    ELEMENT_PARAGRAPH,
    ELEMENT_TODO_LI,
    isBlockAboveEmpty,
    isSelectionAtBlockStart,
    ResetBlockTypePluginOptions,
} from "@udecode/slate-plugins";

const options = createSlatePluginsOptions();

const resetNodeCommonRule = {
    types: [options[ELEMENT_BLOCKQUOTE].type, options[ELEMENT_TODO_LI].type],
    defaultType: options[ELEMENT_PARAGRAPH].type,
};

export const optionsResetNode: ResetBlockTypePluginOptions = {
    rules: [
        {
            ...resetNodeCommonRule,
            hotkey: "Enter",
            predicate: isBlockAboveEmpty,
        },
        {
            ...resetNodeCommonRule,
            hotkey: "Backspace",
            predicate: isSelectionAtBlockStart,
        },
    ],
};
