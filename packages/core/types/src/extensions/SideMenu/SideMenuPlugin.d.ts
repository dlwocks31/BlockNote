import { PluginView } from "@tiptap/pm/state";
import { Plugin, PluginKey } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { BlockNoteEditor } from "../../BlockNoteEditor";
import { BaseUiElementState } from "../../shared/BaseUiElementTypes";
import { EventEmitter } from "../../shared/EventEmitter";
import { Block, BlockSchema } from "../Blocks/api/blockTypes";
export type SideMenuState<BSchema extends BlockSchema> = BaseUiElementState & {
    block: Block<BSchema>;
};
export declare class SideMenuView<BSchema extends BlockSchema> implements PluginView {
    private readonly editor;
    private readonly pmView;
    private readonly updateSideMenu;
    private sideMenuState?;
    private horizontalPosAnchoredAtRoot;
    private horizontalPosAnchor;
    private hoveredBlock;
    isDragging: boolean;
    menuFrozen: boolean;
    constructor(editor: BlockNoteEditor<BSchema>, pmView: EditorView, updateSideMenu: (sideMenuState: SideMenuState<BSchema>) => void);
    /**
     * Sets isDragging when dragging text.
     */
    onDragStart: () => void;
    /**
     * If the event is outside the editor contents,
     * we dispatch a fake event, so that we can still drop the content
     * when dragging / dropping to the side of the editor
     */
    onDrop: (event: DragEvent) => void;
    /**
     * If the event is outside the editor contents,
     * we dispatch a fake event, so that we can still drop the content
     * when dragging / dropping to the side of the editor
     */
    onDragOver: (event: DragEvent) => void;
    onKeyDown: (_event: KeyboardEvent) => void;
    onMouseMove: (event: MouseEvent) => void;
    onScroll: () => void;
    destroy(): void;
    addBlock(): void;
}
export declare const sideMenuPluginKey: PluginKey<any>;
export declare class SideMenuProsemirrorPlugin<BSchema extends BlockSchema> extends EventEmitter<any> {
    private readonly editor;
    private sideMenuView;
    readonly plugin: Plugin;
    constructor(editor: BlockNoteEditor<BSchema>);
    onUpdate(callback: (state: SideMenuState<BSchema>) => void): () => void;
    /**
     * If the block is empty, opens the slash menu. If the block has content,
     * creates a new block below and opens the slash menu in it.
     */
    addBlock: () => void;
    /**
     * Handles drag & drop events for blocks.
     */
    blockDragStart: (event: {
        dataTransfer: DataTransfer | null;
        clientY: number;
    }) => void;
    /**
     * Handles drag & drop events for blocks.
     */
    blockDragEnd: () => void;
    /**
     * Freezes the side menu. When frozen, the side menu will stay
     * attached to the same block regardless of which block is hovered by the
     * mouse cursor.
     */
    freezeMenu: () => boolean;
    /**
     * Unfreezes the side menu. When frozen, the side menu will stay
     * attached to the same block regardless of which block is hovered by the
     * mouse cursor.
     */
    unfreezeMenu: () => boolean;
}
