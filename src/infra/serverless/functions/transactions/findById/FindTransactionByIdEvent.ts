import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/FindTransactionByIdHandler.handler`,
  events: [
    {
      http: {
        method: "get",
        path: "transactions/id/{id}",
      },
    },
  ],
};
