import { assert, enums } from "https://deno.land/x/lestruct/mod.ts";
import {
  getAct,
  getActsKeys,
  getDynamicKeys,
  getService,
  getServiceKeys,
  getStaticKeys,
} from "../mod.ts";
import { Body, parsBody } from "./mod.ts";

export const runAct = (body: Body) => {
  const bodyService = body.service || "main";
  const act = getAct(
    bodyService,
    body.contents,
    body.wants.model,
    body.wants.act,
  );
  assert(body.details, act.validator);

  return act.fn(body);
};

const checkActs = (body: Body) => {
  const bodyService = body.service || "main";
  const actKeys = getActsKeys(bodyService, body.contents, body.wants.model);
  const acts = enums(actKeys);
  assert(body.wants.act, acts);

  return runAct(body);
};

const checkModels = (body: Body) => {
  const bodyService = body.service || "main";
  const models = body.contents === "static"
    ? enums(getStaticKeys(bodyService))
    : enums(getDynamicKeys(bodyService));
  assert(body.wants.model, models);

  return checkActs(body);
};

const checkContetType = (body: Body) => {
  const content = enums(["dynamic", "static"]);
  assert(body.contents, content);

  return checkModels(body);
};

// TODO: do not implement fetch completly it shoud be fetch data with the same req but change the req.body.service to main
const fetchService = async (req: Request, serviceValue: string) => {
  const result = await fetch(serviceValue);
  return result;
};

const checkServices = async (req: Request, port: number) => {
  const body = (await parsBody(req, port)) as Body;
  const serviceKeys = getServiceKeys();
  const servic = enums(serviceKeys);
  const bodyService = body.service || "main";
  assert(bodyService, servic);
  const serviceValue = getService(bodyService);
  return typeof serviceValue === "string"
    ? fetchService(req, serviceValue)
    : checkContetType(body);
};

export const serveLesan = async (req: Request, port: number) => {
  const response = async () => {
    await checkServices(req, port);
  };

  return new Response(
    JSON.stringify({ body: await response(), success: true }),
  );
};
