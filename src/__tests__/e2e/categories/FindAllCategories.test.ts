import request from "supertest";
import { DataSource } from "typeorm";
import { Category } from "src/infra/database/typeORM/categories/Category.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateCategoryInput } from "src/__tests__/utils/CategoryMocks.factory";

describe("Find All Categories (GET /categories)", () => {
  const req = request("http://localhost:3030/dev/categories");
  const categoryInput = makeFakeCreateCategoryInput();
  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();
    await req.post("/").send(categoryInput);
  });

  afterEach(async () => ds.getRepository<Category>(Category).clear());

  it("should return 200 with categories data when request succeeds", async () => {
    const response = await req.get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("categories");
  });

  it("should return 200 with empty array when no category is registered", async () => {
    const response = await req.get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      categories: [],
    });
  });
});
