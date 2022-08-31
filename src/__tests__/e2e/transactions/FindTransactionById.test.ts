import request from "supertest";
import { DataSource } from "typeorm";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { makeFakeCreateUnitDto } from "src/__tests__/utils/UnitMocks.factory";

describe("Find Transaction by Id (GET /units/id/:id)", () => {
  const req = request("http://localhost:3030/dev/units");
  const userInput = makeFakeCreateUnitDto();

  let ds: DataSource;
  let unitId: string;

  beforeAll(async () => {
    ds = await makeDataSource();

    const { body } = await req.post("/").send(userInput);
    unitId = body.unit.id;
  });

  afterAll(async () => ds.getRepository<Unit>(Unit).clear());

  it("should return 200 with user data when valid ID is provided", async () => {
    const response = await req.get(`/id/${unitId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("unit");
  });

  it("should return 404 with errors description when unit ID is not found", async () => {
    const response = await req.get("/id/invalid_id");

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: `Could not find data related to invalid_id unit ID`,
    });
  });
});
