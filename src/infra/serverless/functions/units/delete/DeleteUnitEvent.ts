import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/DeleteUnitHandler.handler`,
  events: [
    {
      http: {
        method: "delete",
        path: "units/{id}",
      },
    },
  ],
};
