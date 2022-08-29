import request from "supertest";
import { DataSource } from "typeorm";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { makeFakeCreateUnitDto } from "src/__tests__/utils/UnitMocks.factory";

describe("Find Unit by Name (GET /users/:name)", () => {
  const req = request("http://localhost:3030/dev/units");
  const userInput = makeFakeCreateUnitDto();
  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();
    await req.post("/").send(userInput);
  });

  afterAll(async () => ds.getRepository<Unit>(Unit).clear());

  it("should return 200 with user data when valid name is provided", async () => {
    const response = await req.get(`/${userInput.name}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("unit");
  });

  it("should return 400 with errors description when invalid name is provided", async () => {
    const response = await req.get("/a");

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: "Request contains invalid data",
      errors: ['"name" length must be at least 3 characters long'],
    });
  });

  it("should return 404 with errors description when unit name is not found", async () => {
    const response = await req.get("/unregistered_unit");

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: "Could not find data related to unregistered_unit unit",
    });
  });
});
