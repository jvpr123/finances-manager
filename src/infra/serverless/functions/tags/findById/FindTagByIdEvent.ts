import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/FindTagByIdHandler.handler`,
  events: [
    {
      http: {
        method: "get",
        path: "tags/id/{id}",
      },
    },
  ],
};
