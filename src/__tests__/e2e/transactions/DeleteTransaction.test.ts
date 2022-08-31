import request from "supertest";
import { DataSource } from "typeorm";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateTransactionDto } from "src/__tests__/utils/TransactionMocks.factory";

import { ITransactionModel } from "src/domain/models/Transaction.model";
import { Transaction } from "src/infra/database/typeORM/transactions/Transaction.entity";

describe("Delete Transaction (DELETE /transactions/:id)", () => {
  const req = request("http://localhost:3030/dev/transactions");
  const transactionInput = makeFakeCreateTransactionDto();

  let ds: DataSource;
  let transactionData: ITransactionModel;

  beforeAll(async () => {
    ds = await makeDataSource();

    const { body } = await req.post("/").send(transactionInput);
    transactionData = body.transaction;
  });

  afterAll(async () => ds.getRepository<Transaction>(Transaction).clear());

  it("should return 200 when valid id is provided", async () => {
    const response = await req.delete(`/${transactionData.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ isDeleted: true });
  });

  it("should return 404 when id provided is not found", async () => {
    const response = await req.delete("/invalid_id");

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: "Could not delete: data related to ID provided not found",
    });
  });
});
