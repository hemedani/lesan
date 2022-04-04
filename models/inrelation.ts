import { getSchema } from "./schema.ts";

const schemas = getSchema();
export const addOneInRelation = (
  { schemaName, inrelationName, type }: {
    schemaName: string;
    inrelationName: string;
    type: "one" | "many";
  },
) => {
  schemas[schemaName].inrelation = {
    ...schemas[schemaName].inrelation,
    [inrelationName]: { schemaName, type },
  };
};
