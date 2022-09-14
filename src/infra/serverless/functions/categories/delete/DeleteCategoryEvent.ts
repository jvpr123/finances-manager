import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/DeleteCategoryHandler.handler`,
  events: [
    {
      http: {
        method: "delete",
        path: "categories/{id}",
      },
    },
  ],
};
