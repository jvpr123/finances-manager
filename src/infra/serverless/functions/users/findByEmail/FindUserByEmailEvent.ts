import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/FindUserByEmailHandler.handler`,
  events: [
    {
      http: {
        method: "get",
        path: "users/{email}",
      },
    },
  ],
};
