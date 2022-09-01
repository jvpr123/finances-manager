import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/UpdateTransactionHandler.handler`,
  events: [
    {
      http: {
        method: "patch",
        path: "transactions",
      },
    },
  ],
};
