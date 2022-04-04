import { Model } from "./types.ts";

const schemas: Record<string, Model> = {};

export type SchemasKey = keyof typeof schemas;

export const getSchema = () => schemas;
