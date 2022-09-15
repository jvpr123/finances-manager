import request from "supertest";
import { DataSource } from "typeorm";

import { Tag } from "src/infra/database/typeORM/tags/Tag.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateTagInput } from "src/__tests__/utils/TagMocks.factory";

describe("Create Tag (POST /tags)", () => {
  const req = request("http://localhost:3030/dev/tags");
  const tagInput = makeFakeCreateTagInput();
  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();
  });

  beforeEach(async () => ds.getRepository<Tag>(Tag).clear());

  it("should return 201 with created tag data when valid data is provided", async () => {
    const response = await req.post("/").send(tagInput);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("tag");
  });

  it("should return 400 with errors description when invalid data is provided", async () => {
    const response = await req.post("/").send({ ...tagInput, color: "" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: "Request contains invalid data",
      errors: ['"color" is not allowed to be empty'],
    });
  });
});
