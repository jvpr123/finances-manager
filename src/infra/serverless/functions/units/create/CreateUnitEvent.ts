import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/CreateUnitHandler.handler`,
  events: [
    {
      http: {
        method: "post",
        path: "units",
      },
    },
  ],
};
