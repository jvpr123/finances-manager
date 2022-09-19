import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/UpdateTagHandler.handler`,
  events: [
    {
      http: {
        method: "patch",
        path: "tags",
      },
    },
  ],
};
