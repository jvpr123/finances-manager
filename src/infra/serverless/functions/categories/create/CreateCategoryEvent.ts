import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/CreateCategoryHandler.handler`,
  events: [
    {
      http: {
        method: "post",
        path: "categories",
      },
    },
  ],
};
