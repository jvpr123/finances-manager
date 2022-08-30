import request from "supertest";
import { DataSource } from "typeorm";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { IUnitModel } from "src/domain/models/Unit.model";
import { makeFakeCreateUnitDto } from "src/__tests__/utils/UnitMocks.factory";

describe("Delete Unit (DELETE /units/:id)", () => {
  const req = request("http://localhost:3030/dev/units");
  const unitInput = makeFakeCreateUnitDto();

  let ds: DataSource;
  let unitData: IUnitModel;

  beforeAll(async () => {
    ds = await makeDataSource();

    const { body } = await req.post("/").send(unitInput);
    unitData = body.unit;
  });

  afterAll(async () => ds.getRepository<Unit>(Unit).clear());

  it("should return 200 when valid id is provided", async () => {
    const response = await req.delete(`/${unitData.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ isDeleted: true });
  });

  it("should return 404 when id provided is not found", async () => {
    const response = await req.delete("/invalid_id");

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: "Could not delete: data related to ID provided not found",
    });
  });
});
