import { assert, enums } from "https://deno.land/x/lestruct/mod.ts";
import { getAct, getActsKeys, getDynamicKeys, getStaticKeys } from "../mod.ts";
import { Body, parsBody } from "./mod.ts";

export const runAct = (body: Body) => {
  const act = getAct(body.contents, body.wants.model, body.wants.act);
  assert(body.details, act.validator);

  return act.fn(body);
};

const checkActs = (body: Body) => {
  const actKeys = getActsKeys(body.contents, body.wants.model);
  const acts = enums(actKeys);
  assert(body.wants.act, acts);

  return runAct(body);
};

const checkModels = (body: Body) => {
  const models = body.contents === "static"
    ? enums(getStaticKeys())
    : enums(getDynamicKeys());
  assert(body.wants.model, models);

  return checkActs(body);
};

const checkContetType = (body: Body) => {
  const content = enums(["dynamic", "static"]);
  assert(body.contents, content);

  return checkModels(body);
};

export const serveLesan = async (req: Request) => {
  const response = async () => {
    const body = (await parsBody(req)) as Body;

    return checkContetType(body);
  };

  return new Response(
    JSON.stringify({ body: await response(), success: true }),
  );
};
