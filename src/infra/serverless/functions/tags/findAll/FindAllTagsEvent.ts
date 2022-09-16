import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/FindAllTagsHandler.handler`,
  events: [
    {
      http: {
        method: "get",
        path: "tags",
      },
    },
  ],
};
