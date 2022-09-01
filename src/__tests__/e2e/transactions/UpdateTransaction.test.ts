import request from "supertest";
import { DataSource } from "typeorm";
import { randomUUID } from "crypto";

import { Transaction } from "src/infra/database/typeORM/transactions/Transaction.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import {
  makeFakeCreateTransactionDto,
  makeFakeUpdateTransactionInput,
} from "src/__tests__/utils/TransactionMocks.factory";

describe("Update Transaction (PATCH /transactions)", () => {
  const req = request("http://localhost:3030/dev/transactions");

  const createTransactionInput = makeFakeCreateTransactionDto();
  const updateTransactionInput = makeFakeUpdateTransactionInput(150);

  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();

    const { body } = await req.post("/").send(createTransactionInput);
    updateTransactionInput.id = body.transaction.id;
  });

  afterAll(async () => ds.getRepository<Transaction>(Transaction).clear());

  it("should return 200 with updated transaction data when valid data is provided", async () => {
    const response = await req.patch("/").send(updateTransactionInput);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("updated");
    expect(response.body).toHaveProperty("transaction");
    expect(response.body.transaction.value).toStrictEqual(150);
  });

  it("should return 400 with errors description when invalid data is provided", async () => {
    const response = await req
      .patch("/")
      .send({ ...updateTransactionInput, value: "" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: "Request contains invalid data",
      errors: ['"value" must be a number'],
    });
  });

  it("should return 404 with errors description when unit is not found", async () => {
    const id = randomUUID();
    const response = await req
      .patch("/")
      .send({ ...updateTransactionInput, id });

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: `Could not update: data related to ID provided not found`,
    });
  });
});
