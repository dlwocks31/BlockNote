import { Plugin, PluginKey } from "prosemirror-state";
import { BlockNoteEditor } from "../../BlockNoteEditor";
import { BaseUiElementState } from "../../shared/BaseUiElementTypes";
import { EventEmitter } from "../../shared/EventEmitter";
import { BlockSchema } from "../Blocks/api/blockTypes";
export type HyperlinkToolbarState = BaseUiElementState & {
    url: string;
    text: string;
};
export declare const hyperlinkToolbarPluginKey: PluginKey<any>;
export declare class HyperlinkToolbarProsemirrorPlugin<BSchema extends BlockSchema> extends EventEmitter<any> {
    private view;
    readonly plugin: Plugin;
    constructor(editor: BlockNoteEditor<BSchema>);
    onUpdate(callback: (state: HyperlinkToolbarState) => void): () => void;
    /**
     * Edit the currently hovered hyperlink.
     */
    editHyperlink: (url: string, text: string) => void;
    /**
     * Delete the currently hovered hyperlink.
     */
    deleteHyperlink: () => void;
    /**
     * When hovering on/off hyperlinks using the mouse cursor, the hyperlink
     * toolbar will open & close with a delay.
     *
     * This function starts the delay timer, and should be used for when the mouse cursor enters the hyperlink toolbar.
     */
    startHideTimer: () => void;
    /**
     * When hovering on/off hyperlinks using the mouse cursor, the hyperlink
     * toolbar will open & close with a delay.
     *
     * This function stops the delay timer, and should be used for when the mouse cursor exits the hyperlink toolbar.
     */
    stopHideTimer: () => void;
}
