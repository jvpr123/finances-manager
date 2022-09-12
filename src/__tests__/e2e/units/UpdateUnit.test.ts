import request from "supertest";
import { DataSource } from "typeorm";
import { randomUUID } from "crypto";

import { Unit } from "src/infra/database/typeORM/units/Unit.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import {
  makeFakeUpdateUnitInput,
  makeFakeCreateUnitDto,
} from "src/__tests__/utils/UnitMocks.factory";

describe("Update Unit (PATCH /units)", () => {
  const req = request("http://localhost:3030/dev/units");

  const createUnitInput = makeFakeCreateUnitDto();
  const updateUnitInput = makeFakeUpdateUnitInput();

  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();

    const { body } = await req.post("/").send(createUnitInput);
    updateUnitInput.id = body?.unit?.id;
  });

  afterAll(async () => ds.getRepository<Unit>(Unit).clear());

  it("should return 200 with updated unit data when valid data is provided", async () => {
    const response = await req.patch("/").send(updateUnitInput);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("updated");
    expect(response.body).toHaveProperty("unit");
  });

  it("should return 400 with errors description when invalid data is provided", async () => {
    const response = await req
      .patch("/")
      .send({ ...updateUnitInput, name: "" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: "Request contains invalid data",
      errors: ['"name" is not allowed to be empty'],
    });
  });

  it("should return 404 with errors description when unit is not found", async () => {
    const id = randomUUID();
    const response = await req
      .patch("/")
      .send({ ...updateUnitInput, id, name: "new_name" });

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: `Could not update: data related to ID ${id} not found`,
    });
  });
});
