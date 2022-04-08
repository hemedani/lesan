
import { AnyStruct, array, assign, create, object } from "https://deno.land/x/lestruct/mod.ts";
import { getSchema, schemas, SchemasKey } from "./mod.ts";

/// context type ----
export interface Context {
  [key: string]: any
}
export let context: Context = {};

export const getContextModel = () => context;

export const addContexts = (con:Context) => {
  context=con
};

export const addContext =(con:Context)=>{
  context={...context,con}
}

export const addReqToContext = (con:Request)=>{
  context["Request"]=con
}
