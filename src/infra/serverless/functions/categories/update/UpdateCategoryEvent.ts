import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/UpdateCategoryHandler.handler`,
  events: [
    {
      http: {
        method: "patch",
        path: "categories",
      },
    },
  ],
};
