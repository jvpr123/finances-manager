import request from "supertest";
import { DataSource } from "typeorm";

import { Transaction } from "src/infra/database/typeORM/transactions/Transaction.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateTransactionDto } from "src/__tests__/utils/TransactionMocks.factory";

describe("Find All Transactions (GET /transactions)", () => {
  const req = request("http://localhost:3030/dev/transactions");
  const inputData = makeFakeCreateTransactionDto();
  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();
    await req.post("/").send(inputData);
  });

  afterEach(async () => ds.getRepository<Transaction>(Transaction).clear());

  it("should return 200 with transactions data when request succeeds", async () => {
    const response = await req.get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("transactions");
  });

  it("should return 200 with empty array when no transaction is registered", async () => {
    const response = await req.get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      transactions: [],
    });
  });
});
