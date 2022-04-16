import { Struct } from "https://deno.land/x/lestruct/mod.ts";
import { SchemasKey } from "./mod.ts";

/**
 * PureModel is interface of pure feature,
 * pure feature is an intrinsic feature of an schema. Which are embedded in other schemas
 * @public
 */
export interface PureModel {
    [key: string]: Struct<any>;
}

/**
 * if schema has relation with other schema and in SQL that we keep foriegn key.
 * store in InRelation feature
 * @public
 */
export interface InRelation {
    /**
     * name of schema that this schema has relation with
     */
    schemaName: SchemasKey;
    /**
     * type of relation if equal to one: this schema recorde one object from other schema else
     * this schema recorde array of object from other schema
     */
    type: "one" | "many";
}

/**
 * if schema has relation with other schema and in SQL that we dont keep foriegn key.
 * store in OutRelation feature
 *  and usualy the number of it grather thant of 50
 * @public
 */
export interface OutRelation {
    /**
     * name of schema that this schema has relation with
     */
    schemaName: SchemasKey;
    /**
     * number of value that we want to keep
     */
    number: number;
    /**
     * sort : {field , order} - field of sort , and order of sort
     */
    sort: { field: string; order: "asc" | "desc" };
}

/**
 * this model includes :pure feacture , inrelation feature and outrelation feacture
 * @public
 */
export interface Model {
    pure: PureModel;
    inrelation: Record<string, InRelation>;
    outrelation: Record<string, OutRelation>;
}
