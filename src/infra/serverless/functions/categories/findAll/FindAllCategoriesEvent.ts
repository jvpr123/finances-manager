import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/FindAllCategoriesHandler.handler`,
  events: [
    {
      http: {
        method: "get",
        path: "categories",
      },
    },
  ],
};
