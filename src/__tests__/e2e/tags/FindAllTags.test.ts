import request from "supertest";
import { DataSource } from "typeorm";
import { Tag } from "src/infra/database/typeORM/tags/Tag.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateTagInput } from "src/__tests__/utils/TagMocks.factory";

describe("Find All Tags (GET /tags)", () => {
  const req = request("http://localhost:3030/dev/tags");
  const tagInput = makeFakeCreateTagInput();
  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();
    await req.post("/").send(tagInput);
  });

  afterEach(async () => ds.getRepository<Tag>(Tag).clear());

  it("should return 200 with tags data when request succeeds", async () => {
    const response = await req.get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("tags");
  });

  it("should return 200 with empty array when no tag is registered", async () => {
    const response = await req.get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      tags: [],
    });
  });
});
