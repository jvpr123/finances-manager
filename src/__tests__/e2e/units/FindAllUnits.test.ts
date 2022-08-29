import request from "supertest";
import { DataSource } from "typeorm";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { makeFakeCreateUnitDto } from "src/__tests__/utils/UnitMocks.factory";

describe("Find Unit by Name (GET /units/:name)", () => {
  const req = request("http://localhost:3030/dev/units");
  const userInput = makeFakeCreateUnitDto();
  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();
    await req.post("/").send(userInput);
  });

  afterEach(async () => ds.getRepository<Unit>(Unit).clear());

  it("should return 200 with units data when request succeeds", async () => {
    const response = await req.get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("units");
  });

  it("should return 200 with empty array when no unit is registered", async () => {
    const response = await req.get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      units: [],
    });
  });
});
