import request from "supertest";
import { DataSource } from "typeorm";

import { Unit } from "src/infra/database/typeORM/units/Unit.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateUnitDto } from "src/__tests__/utils/UnitMocks.factory";

describe("Create Unit (POST /units)", () => {
  const req = request("http://localhost:3030/dev/units");
  const unitInput = makeFakeCreateUnitDto();
  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();
  });

  beforeEach(async () => ds.getRepository<Unit>(Unit).clear());

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
});
