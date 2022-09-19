import request from "supertest";
import { randomUUID } from "crypto";
import { DataSource } from "typeorm";

import { ICreateTransactionInput } from "src/domain/dto/transactions/CreateTransaction.dto";

import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { Category } from "src/infra/database/typeORM/categories/Category.entity";
import { Tag } from "src/infra/database/typeORM/tags/Tag.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateUnitDto } from "src/__tests__/utils/UnitMocks.factory";
import { makeFakeCreateTransactionInput } from "src/__tests__/utils/TransactionMocks.factory";
import { makeFakeCreateCategoryInput } from "src/__tests__/utils/CategoryMocks.factory";
import { makeFakeCreateTagInput } from "src/__tests__/utils/TagMocks.factory";
import { User } from "src/infra/database/typeORM/users/User.entity";
import { makeFakeCreateUserInput } from "src/__tests__/utils/UserMocks.factory";

describe("Create Transaction (POST /transactions)", () => {
  const req = request("http://localhost:3030/dev/transactions");

  let transactionInput: ICreateTransactionInput;
  let ds: DataSource;

  beforeAll(async () => {
    try {
      ds = await makeDataSource();

      const usersRepository = ds.getRepository<User>(User);
      const unitsRepository = ds.getRepository<Unit>(Unit);
      const categoriesRepository = ds.getRepository<Category>(Category);
      const tagsRepository = ds.getRepository<Tag>(Tag);

      const fakeUser = usersRepository.create(makeFakeCreateUserInput());
      const fakeUnit = unitsRepository.create(makeFakeCreateUnitDto());
      const fakeCategory = categoriesRepository.create(
        makeFakeCreateCategoryInput()
      );
      const fakeTag = tagsRepository.create(makeFakeCreateTagInput());

      fakeUnit.owner = fakeUser;

      await usersRepository.save(fakeUser);
      await unitsRepository.save(fakeUnit);
      await categoriesRepository.save(fakeCategory);
      await tagsRepository.save(fakeTag);

      transactionInput = {
        ...makeFakeCreateTransactionInput(),
        unitId: fakeUnit.id,
        categoryId: fakeCategory.id,
        tagsId: [fakeTag.id],
      };
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(async () => {
    await ds.destroy();
  });

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

  it("should return 404 with errors description when invalid category ID is provided", async () => {
    const response = await req
      .post("/")
      .send({ ...transactionInput, categoryId: randomUUID() });

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message:
        "Could not create: Category data related to ID provided not found",
    });
  });

  it("should return 404 with errors description when invalid tag ID is provided", async () => {
    const randomTagId = randomUUID();
    const response = await req
      .post("/")
      .send({ ...transactionInput, tagsId: [randomTagId] });

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: `Could not create: some tags provided were not found: ${randomTagId}`,
    });
  });
});
