import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/CreateTransactionHandler.handler`,
  events: [
    {
      http: {
        method: "post",
        path: "transactions",
      },
    },
  ],
};
