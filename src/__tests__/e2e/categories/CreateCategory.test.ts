import request from "supertest";
import { DataSource } from "typeorm";

import { Category } from "src/infra/database/typeORM/categories/Category.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateCategoryInput } from "src/__tests__/utils/CategoryMocks.factory";

describe("Create Category (POST /categories)", () => {
  const req = request("http://localhost:3030/dev/categories");
  const categoryInput = makeFakeCreateCategoryInput();
  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();
  });

  beforeEach(async () => ds.getRepository<Category>(Category).clear());

  it("should return 201 with created category data when valid data is provided", async () => {
    const response = await req.post("/").send(categoryInput);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("category");
  });

  it("should return 400 with errors description when invalid data is provided", async () => {
    const response = await req.post("/").send({ ...categoryInput, color: "" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: "Request contains invalid data",
      errors: ['"color" is not allowed to be empty'],
    });
  });
});
