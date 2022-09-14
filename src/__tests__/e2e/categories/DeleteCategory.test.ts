import request from "supertest";
import { DataSource } from "typeorm";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateCategoryInput } from "src/__tests__/utils/CategoryMocks.factory";

import { ICategoryModel } from "src/domain/models/Category.model";
import { Category } from "src/infra/database/typeORM/categories/Category.entity";

describe("Delete Transaction (DELETE /categories/:id)", () => {
  const req = request("http://localhost:3030/dev/categories");
  const categoryInput = makeFakeCreateCategoryInput();

  let ds: DataSource;
  let categoryData: ICategoryModel;

  beforeAll(async () => {
    ds = await makeDataSource();

    const { body } = await req.post("/").send(categoryInput);
    categoryData = body.category;
  });

  afterAll(async () => ds.getRepository<Category>(Category).clear());

  it("should return 200 when valid id is provided", async () => {
    const response = await req.delete(`/${categoryData.id}`);

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
