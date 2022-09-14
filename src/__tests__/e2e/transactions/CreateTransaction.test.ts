import request from "supertest";
import { randomUUID } from "crypto";
import { DataSource } from "typeorm";

import { ICreateTransactionInput } from "src/domain/dto/transactions/CreateTransaction.dto";

import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { Transaction } from "src/infra/database/typeORM/transactions/Transaction.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateUnitInput } from "src/__tests__/utils/UnitMocks.factory";
import { makeFakeCreateTransactionInput } from "src/__tests__/utils/TransactionMocks.factory";

describe("Create Transaction (POST /transactions)", () => {
  const req = request("http://localhost:3030/dev/transactions");

  let transactionInput: ICreateTransactionInput;
  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();

    const unitsRepository = ds.getRepository<Unit>(Unit);
    const fakeUnit = unitsRepository.create({
      ...makeFakeCreateUnitInput(),
      currentBalance: 0,
    });

    await unitsRepository.save(fakeUnit);
    transactionInput = {
      ...makeFakeCreateTransactionInput(),
      unitId: fakeUnit.id,
    };
  });

  beforeEach(async () => ds.getRepository<Transaction>(Transaction).clear());

  afterAll(async () => ds.getRepository<Unit>(Unit).clear());

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

  it("should return 404 with errors description when invalid unit ID is provided", async () => {
    const response = await req
      .post("/")
      .send({ ...transactionInput, unitId: randomUUID() });

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: "Could not create: Unit data related to ID provided not found",
    });
  });
});
