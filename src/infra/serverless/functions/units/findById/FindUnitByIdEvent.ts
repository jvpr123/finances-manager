import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/FindUnitByIdHandler.handler`,
  events: [
    {
      http: {
        method: "get",
        path: "units/id/{id}",
      },
    },
  ],
};
