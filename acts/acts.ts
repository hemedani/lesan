import { SchemasKey } from "../models/mod.ts";

// const actsSample = {
//   user: {
//     create: {
//       validator: (input: any) => {
//         return true;
//       },
//       fn: (input: any) => {
//         return input;
//       }
//     },
//     update: {
//       validator: (input: any) => {
//         return true;
//       },
//       fn: (input: any) => {
//         return input;
//       }
//     }
//   }
// }

export interface Act {
  validator: Function;
  fn: Function;
}

export const acts: Record<SchemasKey, Record<string, Act>> = {};

export interface ActInp {
  schema: SchemasKey;
  actName: string;
  validator: Function;
  fn: Function;
}

export const setAct: (doitInp: ActInp) => void = (
  { schema, actName, validator, fn },
) => {
  acts[schema][actName] = { validator, fn };
};

export const getAct: (
  schema: SchemasKey,
  actName: string,
) => Act | undefined = (schema, actName) => {
  return acts[schema][actName];
};

export const getActs: (schema: SchemasKey) => Act[] = (schema) => {
  return Object.values(acts[schema]);
};
