import { Extensions } from "@tiptap/core";
import { BlockNoteEditor } from "./BlockNoteEditor";
import * as Y from "yjs";
/**
 * Get all the Tiptap extensions BlockNote is configured with by default
 */
export declare const getBlockNoteExtensions: <BSchema extends Record<string, import("./extensions/Blocks/api/blockTypes").BlockSpec<string, import("./extensions/Blocks/api/blockTypes").PropSchema>>>(opts: {
    editor: BlockNoteEditor<BSchema>;
    blockSchema: BSchema;
    collaboration?: {
        fragment: Y.XmlFragment;
        user: {
            name: string;
            color: string;
        };
        provider: any;
        renderCursor?: ((user: any) => HTMLElement) | undefined;
    } | undefined;
}) => Extensions;
