import { SchemasKey } from "./mod.ts";

export interface Doit {
  validator: Function;
  fn: Function;
}

export const doits: Record<SchemasKey, Record<string, Doit>> = {};

export interface DoitInp {
  schema: SchemasKey;
  doitName: string;
  validator: Function;
  fn: Function;
}

export const addDoit: (doitInp: DoitInp) => void = (doitInp) => {
  const { schema, doitName, validator, fn } = doitInp;
  doits[schema][doitName] = { validator, fn };
};
