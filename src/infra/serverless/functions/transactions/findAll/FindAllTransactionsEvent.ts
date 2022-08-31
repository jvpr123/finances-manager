import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/FindAllTransactionsHandler.handler`,
  events: [
    {
      http: {
        method: "get",
        path: "transactions",
      },
    },
  ],
};
