import request from "supertest";
import { randomUUID } from "crypto";
import { DataSource } from "typeorm";

import { ICreateUnitInput } from "src/domain/dto/units/ICreateUnit.dto";
import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { User } from "src/infra/database/typeORM/users/User.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateUnitInput } from "src/__tests__/utils/UnitMocks.factory";
import { makeFakeCreateUserInput } from "src/__tests__/utils/UserMocks.factory";

describe("Create Unit (POST /units)", () => {
  const req = request("http://localhost:3030/dev/units");
  let unitInput: ICreateUnitInput;
  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();

    const usersRepository = ds.getRepository<User>(User);
    const fakeUser = usersRepository.create(makeFakeCreateUserInput());

    await usersRepository.save(fakeUser);
    unitInput = { ...makeFakeCreateUnitInput(), ownerId: fakeUser.id };
  });

  beforeEach(async () => ds.getRepository<Unit>(Unit).clear());

  afterAll(async () => ds.getRepository<User>(User).clear());

  it("should return 201 with created unit data when valid data is provided", async () => {
    const response = await req.post("/").send(unitInput);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("unit");
  });

  it("should return 400 with errors description when invalid data is provided", async () => {
    const response = await req
      .post("/")
      .send({ ...unitInput, initialBalance: "" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: "Request contains invalid data",
      errors: ['"initialBalance" must be a number'],
    });
  });

  it("should return 404 with errors description when invalid owner ID is provided", async () => {
    const response = await req
      .post("/")
      .send({ ...unitInput, ownerId: randomUUID() });

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: "Could not create: Owner data related to ID provided not found",
    });
  });
});
