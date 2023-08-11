import { Plugin, PluginKey } from "prosemirror-state";
import { BlockNoteEditor } from "../../../BlockNoteEditor";
import { BaseUiElementState } from "../../BaseUiElementTypes";
import { SuggestionItem } from "./SuggestionItem";
export type SuggestionsMenuState<T extends SuggestionItem> = BaseUiElementState & {
    filteredItems: T[];
    keyboardHoveredItemIndex: number;
};
type SuggestionPluginState<T extends SuggestionItem> = {
    active: boolean;
    triggerCharacter: string | undefined;
    queryStartPos: number | undefined;
    items: T[];
    keyboardHoveredItemIndex: number | undefined;
    notFoundCount: number | undefined;
    decorationId: string | undefined;
};
/**
 * A ProseMirror plugin for suggestions, designed to make '/'-commands possible as well as mentions.
 *
 * This is basically a simplified version of TipTap's [Suggestions](https://github.com/ueberdosis/tiptap/tree/db92a9b313c5993b723c85cd30256f1d4a0b65e1/packages/suggestion) plugin.
 *
 * This version is adapted from the aforementioned version in the following ways:
 * - This version supports generic items instead of only strings (to allow for more advanced filtering for example)
 * - This version hides some unnecessary complexity from the user of the plugin.
 * - This version handles key events differently
 */
export declare const setupSuggestionsMenu: <T extends SuggestionItem, BSchema extends Record<string, import("../../../extensions/Blocks/api/blockTypes").BlockSpec<string, import("../../../extensions/Blocks/api/blockTypes").PropSchema>>>(editor: BlockNoteEditor<BSchema>, updateSuggestionsMenu: (suggestionsMenuState: SuggestionsMenuState<T>) => void, pluginKey: PluginKey, defaultTriggerCharacter: string, items?: (query: string) => T[], onSelectItem?: (props: {
    item: T;
    editor: BlockNoteEditor<BSchema>;
}) => void) => {
    plugin: Plugin<SuggestionPluginState<T>>;
    itemCallback: (item: T) => void;
};
export {};
