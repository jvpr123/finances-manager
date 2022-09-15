import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/CreateTagHandler.handler`,
  events: [
    {
      http: {
        method: "post",
        path: "tags",
      },
    },
  ],
};
