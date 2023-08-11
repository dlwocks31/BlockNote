import { Plugin, PluginKey } from "prosemirror-state";
import { BlockNoteEditor } from "../../BlockNoteEditor";
import { EventEmitter } from "../../shared/EventEmitter";
import { SuggestionsMenuState } from "../../shared/plugins/suggestion/SuggestionPlugin";
import { BlockSchema } from "../Blocks/api/blockTypes";
import { BaseSlashMenuItem } from "./BaseSlashMenuItem";
export declare const slashMenuPluginKey: PluginKey<any>;
export declare class SlashMenuProsemirrorPlugin<BSchema extends BlockSchema, SlashMenuItem extends BaseSlashMenuItem<BSchema>> extends EventEmitter<any> {
    readonly plugin: Plugin;
    readonly itemCallback: (item: SlashMenuItem) => void;
    constructor(editor: BlockNoteEditor<BSchema>, items: SlashMenuItem[]);
    onUpdate(callback: (state: SuggestionsMenuState<SlashMenuItem>) => void): () => void;
}
