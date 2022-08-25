import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/FindAllUsersHandler.handler`,
  events: [
    {
      http: {
        method: "get",
        path: "users",
      },
    },
  ],
};
