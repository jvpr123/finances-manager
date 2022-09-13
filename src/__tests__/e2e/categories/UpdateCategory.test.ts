import request from "supertest";
import { DataSource } from "typeorm";
import { randomUUID } from "crypto";

import { Category } from "src/infra/database/typeORM/categories/Category.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import {
  makeFakeCreateCategoryInput,
  makeFakeUpdateCategoryInput,
} from "src/__tests__/utils/CategoryMocks.factory";

describe("Update Category (PATCH /categories)", () => {
  const req = request("http://localhost:3030/dev/categories");

  const createCategoryInput = makeFakeCreateCategoryInput();
  const updateCategoryInput = makeFakeUpdateCategoryInput();

  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();

    const { body } = await req.post("/").send(createCategoryInput);
    updateCategoryInput.id = body?.category?.id;
  });

  afterAll(async () => ds.getRepository<Category>(Category).clear());

  it("should return 200 with updated category data when valid data is provided", async () => {
    const response = await req.patch("/").send(updateCategoryInput);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("updated");
    expect(response.body).toHaveProperty("category");
  });

  it("should return 400 with errors description when invalid data is provided", async () => {
    const response = await req
      .patch("/")
      .send({ ...updateCategoryInput, title: "" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: "Request contains invalid data",
      errors: ['"title" is not allowed to be empty'],
    });
  });

  it("should return 404 with errors description when category is not found", async () => {
    const id = randomUUID();
    const response = await req
      .patch("/")
      .send({ ...updateCategoryInput, id, title: "other_title" });

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: `Could not update: data related to ID provided not found`,
    });
  });
});
