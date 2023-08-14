import { TypesMatch } from "./blockTypes";
export declare const defaultProps: {
    backgroundColor: {
        default: "transparent";
    };
    textColor: {
        default: "black";
    };
    textAlignment: {
        default: "left";
        values: readonly ["left", "center", "right", "justify"];
    };
};
export type DefaultProps = typeof defaultProps;
export declare const defaultBlockSchema: {
    readonly paragraph: {
        readonly propSchema: {
            backgroundColor: {
                default: "transparent";
            };
            textColor: {
                default: "black";
            };
            textAlignment: {
                default: "left";
                values: readonly ["left", "center", "right", "justify"];
            };
        };
        readonly node: import("./blockTypes").TipTapNode<"paragraph", {
            domAttributes?: Partial<{
                blockContainer: Record<string, string>;
                blockGroup: Record<string, string>;
                editor: Record<string, string>;
                blockContent: Record<string, string>;
                inlineContent: Record<string, string>;
            }> | undefined;
        }, any>;
    };
    readonly heading: {
        readonly propSchema: {
            readonly level: {
                readonly default: "1";
                readonly values: readonly ["1", "2", "3"];
            };
            readonly backgroundColor: {
                default: "transparent";
            };
            readonly textColor: {
                default: "black";
            };
            readonly textAlignment: {
                default: "left";
                values: readonly ["left", "center", "right", "justify"];
            };
        };
        readonly node: import("./blockTypes").TipTapNode<"heading", {
            domAttributes?: Partial<{
                blockContainer: Record<string, string>;
                blockGroup: Record<string, string>;
                editor: Record<string, string>;
                blockContent: Record<string, string>;
                inlineContent: Record<string, string>;
            }> | undefined;
        }, any>;
    };
    readonly bulletListItem: {
        readonly propSchema: {
            backgroundColor: {
                default: "transparent";
            };
            textColor: {
                default: "black";
            };
            textAlignment: {
                default: "left";
                values: readonly ["left", "center", "right", "justify"];
            };
        };
        readonly node: import("./blockTypes").TipTapNode<"bulletListItem", {
            domAttributes?: Partial<{
                blockContainer: Record<string, string>;
                blockGroup: Record<string, string>;
                editor: Record<string, string>;
                blockContent: Record<string, string>;
                inlineContent: Record<string, string>;
            }> | undefined;
        }, any>;
    };
    readonly numberedListItem: {
        readonly propSchema: {
            backgroundColor: {
                default: "transparent";
            };
            textColor: {
                default: "black";
            };
            textAlignment: {
                default: "left";
                values: readonly ["left", "center", "right", "justify"];
            };
        };
        readonly node: import("./blockTypes").TipTapNode<"numberedListItem", {
            domAttributes?: Partial<{
                blockContainer: Record<string, string>;
                blockGroup: Record<string, string>;
                editor: Record<string, string>;
                blockContent: Record<string, string>;
                inlineContent: Record<string, string>;
            }> | undefined;
        }, any>;
    };
};
export type DefaultBlockSchema = TypesMatch<typeof defaultBlockSchema>;
