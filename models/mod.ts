import { InRelation, Model, OutRelation, PureModel } from "./types.ts";

const schemas: Record<string, Model> = {};

export type SchemasKey = keyof typeof schemas;

export const addPureModel = (name: string, pureModel: PureModel) => {
  schemas[name].pure = pureModel;
};

export const addInRelation = (
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

export const addOutRelation = (
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

export const getPureModel = (name: SchemasKey) => schemas[name].pure;

export const getRelation = (
  name: SchemasKey,
  relationType: "inrelation" | "outrelation",
) => schemas[name][relationType];

export const getAllRelation = (name: SchemasKey) => {
  const { pure, inrelation, outrelation } = schemas[name];
  return { pure, inrelation, outrelation };
};

export const getAllModel = () => schemas;

export const getPureModelByName = (name: string) => {
  const pureModel = schemas[name].pure;
  return pureModel;
};

export const getRelationByName = (
  name: string,
  relationType: "inrelation" | "outrelation",
) => {
  const relation = schemas[name][relationType];
  return relation;
};

export const getAllRelationByName = (name: string) => {
  const { pure, inrelation, outrelation } = schemas[name];
  return { pure, inrelation, outrelation };
};

export const getAllModelByName = () => schemas;

export const getPureModelByNameAndKey = (name: string, key: string) => {
  const pureModel = schemas[name].pure[key];
  return pureModel;
};
