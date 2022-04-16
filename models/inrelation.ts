import { getSchemas, SchemasKey } from "./schema.ts";
import { InRelation } from "./types.ts";

const schemas = getSchemas();

/**
 * asign inrelation of schema that schema has relation with it example of relation of SQL that we keep foriegn key.
 * @param schemaName - Name of schema that we want add inerRealation for it
 *   @param inerRealation - record of key value of inRelation Type
*   @example
*   example of input parameter is
*   {
*    schemaName:"city",
*    inerRealation:{
        "provice":{
            "schemaName":"provice",
            "type":"one"
        }
*    }
*   }
 */
export const addInrelations = (
    { schemaName, inrelation }: {
        schemaName: string;
        inrelation: Record<string, InRelation>;
    },
) => {
    const schema = schemas[schemaName];
    if (!schema) {
        throw new Error(`Schema ${schemaName} does not exist`);
    }
    schema.inrelation = inrelation;
};

/**
 * add one innerRelation to previous inrelation of schema that schema has relation with it example of relation of SQL that we keep foriegn key.
 * @param schemaName - Name of schema that we want add inerRealation for it
 *   @param inerRealationName - name of inerRealtion fields
*   @param schemaInRelation - Name of schema that this schema has inerRealation with it
*   @example
*   example of input parameter is
*   {
*     schemaName:"city",
*     "inrelationName":"provice"
*     "schemaInRelation":"provice"
      "type":"one"
*   }
 */
export const addOneInRelation = (
    { schemaName, inrelationName, type, schemaInRelation }: {
        schemaName: string;
        inrelationName: string;
        type: "one" | "many";
        schemaInRelation: SchemasKey;
    },
) => {
    const schema = schemas[schemaName];
    if (!schema) {
        throw new Error(`Schema ${schemaName} does not exist`);
    }
    schema.inrelation = {
        ...schema.inrelation,
        [inrelationName]: { schemaName: schemaInRelation, type },
    };
};

/**
 * get all of inerRealation of one schema
 * @param schemaName - name of schema that we want inerRealation of it
 */
export const getInrelations = (schemaName: string) => schemas[schemaName].inrelation;
