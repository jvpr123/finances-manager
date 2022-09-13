import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/FindCategoryByIdHandler.handler`,
  events: [
    {
      http: {
        method: "get",
        path: "categories/id/{id}",
      },
    },
  ],
};
