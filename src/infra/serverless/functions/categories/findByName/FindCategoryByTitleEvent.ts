import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/FindCategoryByTitleHandler.handler`,
  events: [
    {
      http: {
        method: "get",
        path: "categories/{name}",
      },
    },
  ],
};
