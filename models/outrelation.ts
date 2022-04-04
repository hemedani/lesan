import { getSchema } from "./schema.ts";

const schemas = getSchema();

export const addOneOutRelation = (
  { schemaName, outrelationName, number, sort }: {
    schemaName: string;
    outrelationName: string;
    number: number;
    sort: {
      field: string;
      order: "asc" | "desc";
    };
  },
) => {
  schemas[schemaName].outrelation = {
    ...schemas[schemaName].outrelation,
    [outrelationName]: { schemaName, number, sort },
  };
};
