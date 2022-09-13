import request from "supertest";
import { DataSource } from "typeorm";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { makeFakeCreateCategoryInput } from "src/__tests__/utils/CategoryMocks.factory";

describe("Find Category by Title (GET /categories/:name)", () => {
  const req = request("http://localhost:3030/dev/categories");
  const categoryInput = makeFakeCreateCategoryInput();
  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();
    await req.post("/").send(categoryInput);
  });

  afterAll(async () => ds.getRepository<Unit>(Unit).clear());

  it("should return 200 with category data when valid title is provided", async () => {
    const response = await req.get(`/${categoryInput.title}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("category");
  });

  it("should return 404 with errors description when category is not found", async () => {
    const response = await req.get("/unregistered_category");

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: "Could not find data related to unregistered_category category",
    });
  });
});
