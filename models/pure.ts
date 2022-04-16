import { getSchemas, SchemasKey } from "./schema.ts";
import { PureModel } from "./types.ts";

const schemas = getSchemas();

/**
 * add pure feature of model to schema
 * @param name - name of schema that we want to add pure features
 * @param pureModel - key and type of model to add schema
 *
 *  @example
 *  name:"city"
 *  pureModel: {
 *    "name":string()
 *  }
 */
export const addPureModel = (name: string, pureModel: PureModel) => {
    schemas[name] = {
        pure: pureModel,
        inrelation: {},
        outrelation: {},
    };
    // schemas[name].pure = pureModel;
};

/**
 * get pure features of one schema
 * @param name - name of schema that we want to get pure feature
 */
export const getPureModel = (name: SchemasKey) => schemas[name].pure;

/**
 * get pure one feature of one schema by name of schema and key of feature
 * @param name - name of schema that we want to get one pure feature
 * @param key - key of feature of schema that we want to get one pure feature
 */
export const getPureModelByNameAndKey = (name: string, key: string) => {
    const pureModel = schemas[name].pure[key];
    return pureModel;
};
