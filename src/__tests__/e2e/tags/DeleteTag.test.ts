import request from "supertest";
import { DataSource } from "typeorm";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateTagInput } from "src/__tests__/utils/TagMocks.factory";

import { ICategoryModel } from "src/domain/models/Category.model";
import { Tag } from "src/infra/database/typeORM/tags/Tag.entity";

describe("Delete Tag (DELETE /tags/:id)", () => {
  const req = request("http://localhost:3030/dev/tags");
  const tagInput = makeFakeCreateTagInput();

  let ds: DataSource;
  let tagData: ICategoryModel;

  beforeAll(async () => {
    ds = await makeDataSource();

    const { body } = await req.post("/").send(tagInput);
    tagData = body.tag;
  });

  afterAll(async () => ds.getRepository<Tag>(Tag).clear());

  it("should return 200 when valid id is provided", async () => {
    const response = await req.delete(`/${tagData.id}`);

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
