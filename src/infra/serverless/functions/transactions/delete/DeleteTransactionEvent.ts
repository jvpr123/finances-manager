import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/DeleteTransactionHandler.handler`,
  events: [
    {
      http: {
        method: "delete",
        path: "transactions/{id}",
      },
    },
  ],
};
