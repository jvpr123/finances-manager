import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/UpdateUnitHandler.handler`,
  events: [
    {
      http: {
        method: "patch",
        path: "units",
      },
    },
  ],
};
