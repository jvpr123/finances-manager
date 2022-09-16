import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/DeleteTagHandler.handler`,
  events: [
    {
      http: {
        method: "delete",
        path: "tags/{id}",
      },
    },
  ],
};
