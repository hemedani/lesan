import { getSchemas, SchemasKey } from "./schema.ts";

const schemas = getSchemas();

/**
 * get inerRelatrion or outerRealtion of one schema
 * @param name - name of schema
 * @param relationType - type of relation that we want (inerRelatrion or outrelation)
 */
export const getRelation = (
    name: SchemasKey,
    relationType: "inrelation" | "outrelation",
) => schemas[name][relationType];
