import { getSchema, SchemasKey } from "./schema.ts";

const schemas = getSchema();

export const getRelation = (
  name: SchemasKey,
  relationType: "inrelation" | "outrelation",
) => schemas[name][relationType];
