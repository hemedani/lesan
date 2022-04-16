/// context type ----
//

/**
 * Context Holds values and carries them in functions.
 * @example
 * {
 *    Request: "values of Req",
 *      user: {
 *           "_id":1,
 *           "name":"ali",
 *           "lastName":"Alavi"
 *           "role":"Admin"
 *      }  *
 */
export interface Context {
    [key: string]: any;
}

/**
 *  variable of context
 *  @defaultValue
 *   the value of context is '{}'
 */
export let context: Context = {};

/**
 * @returns The contextModel
 */
export const getContextModel = () => context;

/**
 * asign all of value that we want to carry
 *  @param con - objects of key , value
 * @returns nothing
 */
export const addContexts = (con: Context) => {
    context = con;
};
/**
 * add values to previous values that we want to carry
 *  @param con - objects of key , value
 * @returns nothing
 */
export const addContext = (con: Context) => {
    context = { ...context, con };
};
/**
 * add Request to Context because the requeste may be required in later functions
 *  @param con - request of user
 * @returns nothing
 */
export const addReqToContext = (con: Request) => {
    context["Request"] = con;
};
