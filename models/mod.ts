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

// const schemasSample = {
//   "user": {
//     pure: {
//       "id": string(),
//       "name": string(),
//       "age": number(),
//     },
//     inrelation: {
//       "posts": { schemaName: "post", type: "many" },
//     },
//     outrelation: {
//       "comments": {
//         schemaName: "comment",
//         number: 50,
//         sort: { filed: "id", order: "desc" },
//       },
//     },
//     embedded: {
//       "posts": array({
//         "id": string(),
//         "title": string(),
//         "content": string(),
//       }),
//       "comments": array({
//         "id": string(),
//         "content": string(),
//       }),
//     },
//     sttuct: assign(
//       object({
//         "id": string(),
//         "name": string(),
//         "age": number(),
//       }),
//       object({
//         "posts": array({
//           "id": string(),
//           "title": string(),
//           "content": string(),
//         }),
//         "comments": array({
//           "id": string(),
//           "content": string(),
//         }),
//       }),
//     ),
//   },
//   "post": {
//     pure: {
//       "id": string(),
//       "title": string(),
//       "content": string(),
//     },
//     inrelation: {
//       "user": { schemaName: "user", type: "one" },
//     },
//     outrelation: {
//       "comments": {
//         schemaName: "comment",
//         number: 50,
//         sort: { filed: "id", order: "desc" },
//       },
//     },
//     embedded: {
//       "user": object({
//         "id": string(),
//         "name": string(),
//         "age": number(),
//       }),
//       "comments": array({
//         "id": string(),
//         "content": string(),
//       }),
//     },
//     sttuct: assign(
//       object({
//         "id": string(),
//         "title": string(),
//         "content": string(),
//       }),
//       object({
//         "user": object({
//           "id": string(),
//           "name": string(),
//           "age": number(),
//         }),
//         "comments": array({
//           "id": string(),
//           "content": string(),
//         }),
//       }),
//     ),
//   },
//   "comment": {
//     pure: {
//       "id": string(),
//       "content": string(),
//     },
//     inrelation: {
//       "user": { schemaName: "user", type: "one" },
//     },
//     outrelation: {
//       "post": {
//         schemaName: "post",
//         number: 50,
//         sort: { filed: "id", order: "desc" },
//       },
//     },
//     embedded: {
//       "user": object({
//         "id": string(),
//         "name": string(),
//         "age": number(),
//       }),
//       "post": object({
//         "id": string(),
//         "title": string(),
//         "content": string(),
//       }),
//     },
//     sttuct: assign(
//       object({
//         "id": string(),
//         "content": string(),
//       }),
//       object({
//         "user": object({
//           "id": string(),
//           "name": string(),
//           "age": number(),
//         }),
//         "post": object({
//           "id": string(),
//           "title": string(),
//           "content": string(),
//         }),
//       }),
//     ),
//   },
// };

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
