import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/CreateUserHandler.handler`,
  events: [
    {
      http: {
        method: "post",
        path: "users",
      },
    },
  ],
};
