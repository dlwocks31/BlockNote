import { EditorState, Plugin, PluginKey } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { BaseUiElementCallbacks, BaseUiElementState, BlockNoteEditor, BlockSchema } from "../..";
import { EventEmitter } from "../../shared/EventEmitter";
export type FormattingToolbarCallbacks = BaseUiElementCallbacks;
export type FormattingToolbarState = BaseUiElementState;
export declare class FormattingToolbarView<BSchema extends BlockSchema> {
    private readonly editor;
    private readonly pmView;
    private formattingToolbarState?;
    updateFormattingToolbar: () => void;
    preventHide: boolean;
    preventShow: boolean;
    prevWasEditable: boolean | null;
    shouldShow: (props: {
        view: EditorView;
        state: EditorState;
        from: number;
        to: number;
    }) => boolean;
    constructor(editor: BlockNoteEditor<BSchema>, pmView: EditorView, updateFormattingToolbar: (formattingToolbarState: FormattingToolbarState) => void);
    viewMousedownHandler: () => void;
    viewMouseupHandler: () => void;
    dragstartHandler: () => void;
    focusHandler: () => void;
    blurHandler: (event: FocusEvent) => void;
    scrollHandler: () => void;
    update(view: EditorView, oldState?: EditorState): void;
    destroy(): void;
    getSelectionBoundingBox(): DOMRect;
}
export declare const formattingToolbarPluginKey: PluginKey<any>;
export declare class FormattingToolbarProsemirrorPlugin<BSchema extends BlockSchema> extends EventEmitter<any> {
    private view;
    readonly plugin: Plugin;
    constructor(editor: BlockNoteEditor<BSchema>);
    onUpdate(callback: (state: FormattingToolbarState) => void): () => void;
}
