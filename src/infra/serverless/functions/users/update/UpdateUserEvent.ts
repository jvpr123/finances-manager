import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/UpdateUserHandler.handler`,
  events: [
    {
      http: {
        method: "patch",
        path: "users",
      },
    },
  ],
};
