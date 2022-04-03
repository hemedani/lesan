import { AnyStruct } from "../lestruct/src/utils.ts";

interface PureModel {
  [key: string]: AnyStruct;
}

export type Relations = Record<string, PureModel>;

export interface Model {
  pure: PureModel;
  inrelation: Relations;
  outrelation: Relations;
}

const schemas: Record<string, Model> = {};

export type SchemasKey = keyof typeof schemas;

export const addPureModel = (name: string, pureModel: PureModel) => {
  schemas[name].pure = pureModel;
};

export const addRelation = (
  name: SchemasKey,
  relationType: "inrelation" | "outrelation",
  relation: Relations,
) => {
  schemas[name][relationType] = relation;
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

export const getRelationByNameAndKey = (
  name: string,
  relationType: "inrelation" | "outrelation",
  key: string,
) => {
  const relation = schemas[name][relationType][key];
  return relation;
};
