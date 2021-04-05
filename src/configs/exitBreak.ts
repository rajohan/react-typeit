import {
    createSlatePluginsOptions,
    ELEMENT_IMAGE,
    ExitBreakPluginOptions,
    KEYS_HEADING,
} from "@udecode/slate-plugins";

const options = createSlatePluginsOptions();

export const optionsExitBreak: ExitBreakPluginOptions = {
    rules: [
        {
            hotkey: "mod+enter",
        },
        {
            hotkey: "mod+shift+enter",
            before: true,
        },
        {
            hotkey: "enter",
            query: {
                start: true,
                end: true,
                allow: KEYS_HEADING,
            },
        },
        {
            hotkey: "enter",
            query: {
                allow: [options[ELEMENT_IMAGE].type],
            },
        },
    ],
};
