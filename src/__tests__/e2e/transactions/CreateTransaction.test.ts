import request from "supertest";
import { DataSource } from "typeorm";

import { Unit } from "src/infra/database/typeORM/units/Unit.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateTransactionDto } from "../../utils/TransactionMocks.factory";

describe("Create Transaction (POST /transactions)", () => {
  const req = request("http://localhost:3030/dev/transactions");
  const transactionInput = makeFakeCreateTransactionDto();
  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();
  });

  beforeEach(async () => ds.getRepository<Unit>(Unit).clear());

  it("should return 201 with created transaction data when valid data is provided", async () => {
    const response = await req.post("/").send(transactionInput);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("transaction");
  });

  it("should return 400 with errors description when invalid data is provided", async () => {
    const response = await req
      .post("/")
      .send({ ...transactionInput, value: "" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: "Request contains invalid data",
      errors: ['"value" must be a number'],
    });
  });
});
