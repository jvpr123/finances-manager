import request, { Response } from "supertest";
import { DataSource } from "typeorm";
import { Category } from "src/infra/database/typeORM/categories/Category.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateCategoryInput } from "src/__tests__/utils/CategoryMocks.factory";

describe("Find Category by ID (GET /categories/id/:id)", () => {
  const req = request("http://localhost:3030/dev/categories");
  const categoryInput = makeFakeCreateCategoryInput();
  let ds: DataSource;
  let response: Response;

  beforeAll(async () => {
    ds = await makeDataSource();
    response = await req.post("/").send(categoryInput);
  });

  afterAll(async () => ds.getRepository<Category>(Category).clear());

  it("should return 200 with category data when valid ID is provided", async () => {
    const res = await req.get(`/id/${response.body.category.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("category");
  });

  it("should return 404 with errors description when category is not found", async () => {
    const response = await req.get("/id/unregistered_category");

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: "Could not find data related to category ID provided",
    });
  });
});
