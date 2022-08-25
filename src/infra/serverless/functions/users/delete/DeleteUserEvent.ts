import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/DeleteUserHandler.handler`,
  events: [
    {
      http: {
        method: "delete",
        path: "users/{id}",
      },
    },
  ],
};
