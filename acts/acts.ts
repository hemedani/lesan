import { Struct } from "https://deno.land/x/lestruct/mod.ts";
import { SchemasKey } from "../models/mod.ts";
import { Body } from "../utils/mod.ts";

// const actsSample = {
//   dynamic: {
//     user: {
//       create: {
//         validator: (input: any) => {
//           return true;
//         },
//         fn: (input: any) => {
//           return input;
//         },
//       },
//       update: {
//         validator: (input: any) => {
//           return true;
//         },
//         fn: (input: any) => {
//           return input;
//         },
//       },
//     },
//   },
//   static: {
//     "blogFirstPage": {
//       "get": {
//         "validator": (input: any) => {
//           return true;
//         },
//         "fn": (input: any) => {
//           return input;
//         },
//       },
//       "set": {
//         "validator": (input: any) => {
//           return true;
//         },
//         "fn": (input: any) => {
//           return input;
//         },
//       },
//     },
//   },
// };

export type ActFn = (body: Body) => any;

export interface Act {
  validator: Struct<any>;
  fn: ActFn;
}

export interface Acts {
  dynamic: {
    [key: string]: {
      [key: string]: Act;
    };
  };
  static: {
    [key: string]: {
      [key: string]: Act;
    };
  };
}

export const acts: Acts = {
  dynamic: {},
  static: {},
};

export interface ActInp {
  type: "static" | "dynamic";
  schema: SchemasKey;
  actName: string;
  validator: Struct<any>;
  fn: ActFn;
}

export const setAct: (actInp: ActInp) => void = (
  { type, schema, actName, validator, fn },
) => {
  if (!acts[type]) {
    throw new Error(`Invalid type: ${type}`);
  }
  if (!acts[type][schema]) {
    acts[type][schema] = {};
  }
  acts[type][schema][actName] = {
    validator,
    fn,
  };
};

export const getDynamicActs = () => acts.dynamic;

export const getStaticActs = () => acts.static;

export const getStaticKeys = () => Object.keys(acts.static);

export const getDynamicKeys = () => Object.keys(acts.dynamic);

export const getSchemaDynamicActs: (
  schema: SchemasKey,
) => { [key: string]: Act } = (
  schema,
) => {
  if (!acts.dynamic[schema]) {
    throw new Error(`Invalid schema: ${schema}`);
  }
  return acts.dynamic[schema];
};

export const getSchemaStaticActs: (schema: string) => { [key: string]: Act } = (
  schema,
) => {
  if (!acts.static[schema]) {
    throw new Error(`Invalid schema: ${schema}`);
  }
  return acts.static[schema];
};

export const getDynamicAct: (
  schema: SchemasKey,
  actName: string,
) => Act = (schema, actName) => {
  if (!acts.dynamic[schema]) {
    throw new Error(`Invalid schema: ${schema}`);
  }
  if (!acts.dynamic[schema][actName]) {
    throw new Error(`Invalid actName: ${actName}`);
  }
  return acts.dynamic[schema][actName];
};

export const getStaticAct: (
  schema: string,
  actName: string,
) => Act = (schema, actName) => {
  if (!acts.static[schema]) {
    throw new Error(`Invalid actName: ${actName}`);
  }
  if (!acts.static[schema][actName]) {
    throw new Error(`Invalid actName: ${actName}`);
  }
  return acts.static[schema][actName];
};

export const getActs = (type: "static" | "dynamic", schema: string) => {
  if (!acts[type]) {
    throw new Error(
      `Invalid action type: ${type} it just include dynamic and static`,
    );
  }
  if (!acts[type][schema]) {
    throw new Error(`Invalid schema: ${schema}`);
  }
  return acts[type][schema];
};

export const getActsKeys = (type: "static" | "dynamic", schema: string) => {
  if (!acts[type]) {
    throw new Error(
      `Invalid action type: ${type} it just include dynamic and static`,
    );
  }
  if (!acts[type][schema]) {
    throw new Error(`Invalid schema: ${schema}`);
  }
  return Object.keys(acts[type][schema]);
};

export const getAct = (
  type: "static" | "dynamic",
  schema: string,
  actName: string,
) => {
  if (!acts[type]) {
    throw new Error(
      `Invalid action type: ${type} it just include dynamic and static`,
    );
  }
  if (!acts[type][schema]) {
    throw new Error(`Invalid schema: ${schema}`);
  }
  if (!acts[type][schema][actName]) {
    throw new Error(`Invalid action name: ${actName}`);
  }
  return acts[type][schema][actName];
};
