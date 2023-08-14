import { BaseSlashMenuItem } from "./BaseSlashMenuItem";
export declare const getDefaultSlashMenuItems: <BSchema extends Record<string, import("../Blocks/api/blockTypes").BlockSpec<string, import("../Blocks/api/blockTypes").PropSchema>>>(schema?: BSchema) => BaseSlashMenuItem<BSchema>[];
