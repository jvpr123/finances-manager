import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/FindAllUnitsHandler.handler`,
  events: [
    {
      http: {
        method: "get",
        path: "units",
      },
    },
  ],
};
