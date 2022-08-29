import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/FindUnitByNameHandler.handler`,
  events: [
    {
      http: {
        method: "get",
        path: "units/{name}",
      },
    },
  ],
};
