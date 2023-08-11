import { Node, NodeType } from "prosemirror-model";
export type BlockInfo = {
    id: string;
    node: Node;
    contentNode: Node;
    contentType: NodeType;
    numChildBlocks: number;
    startPos: number;
    endPos: number;
    depth: number;
};
/**
 * Retrieves information regarding the nearest blockContainer node in a
 * ProseMirror doc, relative to a position.
 * @param doc The ProseMirror doc.
 * @param pos An integer position.
 * @returns A BlockInfo object for the nearest blockContainer node.
 */
export declare function getBlockInfoFromPos(doc: Node, pos: number): BlockInfo;
