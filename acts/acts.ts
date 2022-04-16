import { Struct } from "https://deno.land/x/lestruct/mod.ts";
import { SchemasKey } from "../models/mod.ts";
import { Body, throwError } from "../utils/mod.ts";

// const actsSample = {
//
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

/**
 * type of ActFn
 *  @param body - input of function is type of body
 *  type of Body is equal to
 *  { service?: ServiceKeys;
 *  contents: "dynamic" | "static";
 *  wants: {
 *    model: string;
 *    act: string;
 *  };
 *  details: Details;
 *  }
 */
export type ActFn = (body: Body) => any;

/**
 * interface of Act is enclude of tow features
 * validator of function and fn
 */
export interface Act {
    validator: Struct<any>;
    fn: ActFn;
}

/**
 * Acts include tow features : dynamic and static
 *  dynamic for dynamic request and static for static request for example get static file
 *  @example
 *
 *   dynamic: {
 *     user: {
 *       create: {
 *         validator: (input: any) => {
 *           return true;
 *         },
 *         fn: (input: any) => {
 *           return input;
 *         },
 *       },
 *       update: {
 *         validator: (input: any) => {
 *           return true;
 *         },
 *         fn: (input: any) => {
 *           return input;
 *         },
 *       },
 *     },
 *   },
 *   static: {
 *     "blogFirstPage": {
 *       "get": {
 *         "validator": (input: any) => {
 *           return true;
 *         },
 *         "fn": (input: any) => {
 *           return input;
 *         },
 *       },
 *       "set": {
 *         "validator": (input: any) => {
 *           return true;
 *         },
 *         "fn": (input: any) => {
 *           return input;
 *         },
 *       },
 *     },
 *   },
 */
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

/**
 * service inteface is include main service and functions
 *  and also maybe include other services
 *  @example
 *  {
 *     main:{
 *   dynamic: {
 *     user: {
 *       create: {
 *         validator: (input: any) => {
 *           return true;
 *         },
 *         fn: (input: any) => {
 *           return input;
 *         },
 *       },
 *   static: {
 *     "blogFirstPage": {
 *       "get": {
 *         "validator": (input: any) => {
 *           return true;
 *         },
 *         "fn": (input: any) => {
 *           return input;
 *         },
 *       },
 *     }
 *     },
 *     },
 *     "ecommerce":"https://localhost:5050/lesan",
 *      "blog":{
 *   dynamic: {
 *     user: {
 *       create: {
 *         validator: (input: any) => {
 *           return true;
 *         },
 *         fn: (input: any) => {
 *           return input;
 *         },
 *       },
 *      }
 *  },
 *  main services is type of Acts , other services maybe type of string or Acts:
 *  if type of string we get answer of req with http Request , but if type of it equal to Acts with anwer to req directly
 */
export interface Services {
    main: Acts;
    [key: string]: Acts | string | undefined;
}

const acts: Services = {
    main: {
        dynamic: {},
        static: {},
    },
};

export interface ActInp {
    type: "static" | "dynamic";
    schema: SchemasKey;
    actName: string;
    validator: Struct<any>;
    fn: ActFn;
}

/**
 * set Actions to main service
 * @param actInp - actInp is equal to{
 * type: type of Actions static or dynamic,
 * schema: schema name of action  for example city
 * actName: name of action  for example createCity,
 * validator: validator function,
 * fn: function of crreateUser
 * }
 */
export const setAct: (actInp: ActInp) => void = (
    { type, schema, actName, validator, fn },
) => {
    if (!acts.main[type]) {
        throw new Error(`Invalid type: ${type}`);
    }
    if (!acts.main[type][schema]) {
        acts.main[type][schema] = {};
    }
    acts.main[type][schema][actName] = {
        validator,
        fn,
    };
};
/**
 * type of service Keys
 */
export type ServiceKeys = keyof typeof acts;

/**
 * get Dynamic Actions wih service key,
 * @param serviceName - name of service that we want get dynamic of Actions
 * @returns dynamic actions
 * if service doesnt have dynamic Acts throw Exception
 */
export const getDynamicActs = (serviceName?: ServiceKeys) => {
    return (serviceName && acts[serviceName]
            && (typeof acts[serviceName] !== "string"))
        ? (acts[serviceName] as Acts).dynamic
        : acts.main.dynamic;
};
/**
 * get Static Actions wih service key,
 * @param serviceName - name of service that we want get dynamic of Actions
 * @returns static actions
 * if service doesnt have static Acts throw Exception
 */
export const getStaticActs = (serviceName?: ServiceKeys) => {
    return (serviceName && acts[serviceName]
            && (typeof acts[serviceName] !== "string"))
        ? (acts[serviceName] as Acts).static
        : acts.main.static;
};

export const getStaticKeys = (serviceName?: ServiceKeys) => {
    return (serviceName && acts[serviceName]
            && (typeof acts[serviceName] !== "string"))
        ? Object.keys((acts[serviceName] as Acts).static)
        : (serviceName === "main")
        ? Object.keys(acts.main.static)
        : throwError(`serviceName not valid : ${serviceName}`);
};

// TODO : check if acts[serviceName] === "string" should throw an error
export const getDynamicKeys = (serviceName: ServiceKeys) => {
    return (serviceName && acts[serviceName]
            && (typeof acts[serviceName] !== "string"))
        ? Object.keys((acts[serviceName] as Acts).dynamic)
        : (serviceName === "main")
        ? Object.keys(acts.main.dynamic)
        : throwError(`serviceName not valid : ${serviceName}`);
};

/**
 * get key of serives
 */
export const getServiceKeys = () => Object.keys(acts);

/**
 *  get Dynamic Actions of main service with schemaName
 *  @param schema - name of schema
 *  @returns dynamic Actions of specific schema of main service
 */
export const getSchemaDynamicActs: (
    schema: SchemasKey,
) => { [key: string]: Act } = (
    schema,
) => {
    if (!acts.main.dynamic[schema]) {
        throw new Error(`Invalid schema: ${schema}`);
    }
    return acts.main.dynamic[schema];
};

/**
 *  get Static Actions of main service with schemaName
 *  @param schema - name of schema
 *  @returns static Actions of specific schema of main service
 */
export const getSchemaStaticActs: (schema: string) => { [key: string]: Act } = (
    schema,
) => {
    if (!acts.main.static[schema]) {
        throw new Error(`Invalid schema: ${schema}`);
    }
    return acts.main.static[schema];
};

/**
 *  get specific Dynamic Action of main service with schemaName and actName
 *  @param schema - name of schema for example: user
 *  @param actName - name of Actions for example: create
 *  @returns
 *  return specific action of schema
 *  @example
 *  for example output is:
 *      {
 *         validator: (input: any) => {
 *           return true;
 *         },
 *         fn: (input: any) => {
 *           return input;
 *         },
 *        }
 */
export const getDynamicAct: (
    schema: SchemasKey,
    actName: string,
) => Act = (schema, actName) => {
    if (!acts.main.dynamic[schema]) {
        throw new Error(`Invalid schema: ${schema}`);
    }
    if (!acts.main.dynamic[schema][actName]) {
        throw new Error(`Invalid actName: ${actName}`);
    }
    return acts.main.dynamic[schema][actName];
};

/**
 *  get specific Static Action of main service with schemaName and actName
 *  @param schema - name of schema for example: user
 *  @param actName - name of Actions for example: create
 *  @returns
 *  return specific action of schema
 */
export const getStaticAct: (
    schema: string,
    actName: string,
) => Act = (schema, actName) => {
    if (!acts.main.static[schema]) {
        throw new Error(`Invalid actName: ${actName}`);
    }
    if (!acts.main.static[schema][actName]) {
        throw new Error(`Invalid actName: ${actName}`);
    }
    return acts.main.static[schema][actName];
};

/**
 * get actions of schema of main service
 *  @param schema - name of schema
 *  @param type - type of sctions of service dynamic or static
 */
export const getActs = (type: "static" | "dynamic", schema: string) => {
    if (!acts.main[type]) {
        throw new Error(
            `Invalid action type: ${type} it just include dynamic and static`,
        );
    }
    if (!acts.main[type][schema]) {
        throw new Error(`Invalid schema: ${schema}`);
    }
    return acts.main[type][schema];
};

/**
 * get actions of schema of specific service
 * @param service - name of service for example "main" | "ecommerce" | "blog"
 *  @param schema - name of schema
 *  @param type - type of actions of service dynamic or static
 */
export const getActsKeys = (
    service: ServiceKeys,
    type: "static" | "dynamic",
    schema: string,
) => {
    if (!acts[service] && typeof acts[service] === "string") {
        throw new Error(
            `Invalid service name: ${service} `,
        );
    }
    if (!(acts[service] as Acts)[type]) {
        throw new Error(
            `Invalid action type: ${type} it just include dynamic and static`,
        );
    }
    if (!(acts[service] as Acts)[type][schema]) {
        throw new Error(`Invalid schema: ${schema}`);
    }
    return Object.keys((acts[service] as Acts)[type][schema]);
};

/**
 * get specific action of schema of specific service
 * @param service - name of service for example "main" | "ecommerce" | "blog"
 *  @param schema - name of schema
 *  @param type - type of actions of service dynamic or static
 *  @param actName - name of actions
 */
export const getAct = (
    service: ServiceKeys,
    type: "static" | "dynamic",
    schema: string,
    actName: string,
) => {
    if (!acts[service] && typeof acts[service] === "string") {
        throw new Error(
            `Invalid service name: ${service} `,
        );
    }
    if (!(acts[service] as Acts)[type]) {
        throw new Error(
            `Invalid action type: ${type} it just include dynamic and static`,
        );
    }
    if (!(acts[service] as Acts)[type][schema]) {
        throw new Error(`Invalid schema: ${schema}`);
    }
    if (!(acts[service] as Acts)[type][schema][actName]) {
        throw new Error(`Invalid action name: ${actName}`);
    }
    return (acts[service] as Acts)[type][schema][actName];
};

/**
 * get all acts
 */
export const getAtcsWithServices = () => acts;

/**
 * set acts to service or ser addreess to service
 *  @param serviceName - name of service
 *  @param service - type of service string or Acts
 */
export const setService: (serviceName: string, service: Acts | string) => void = (serviceName, service) => {
    acts[serviceName] = service;
};

/**
 * get all of acts of specific service
 * @param serviceName - name of service
 */
export const getService: (serviceName: ServiceKeys) => void = (serviceName) => {
    if (!acts[serviceName]) {
        throw new Error(`Invalid serviceName: ${serviceName}`);
    }
    return acts[serviceName];
};
