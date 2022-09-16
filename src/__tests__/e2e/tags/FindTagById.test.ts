import request, { Response } from "supertest";
import { DataSource } from "typeorm";
import { Tag } from "src/infra/database/typeORM/tags/Tag.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateTagInput } from "src/__tests__/utils/TagMocks.factory";

describe("Find Tag by ID (GET /tags/id/:id", () => {
  const req = request("http://localhost:3030/dev/tags");
  const tagInput = makeFakeCreateTagInput();
  let ds: DataSource;
  let response: Response;

  beforeAll(async () => {
    ds = await makeDataSource();
    response = await req.post("/").send(tagInput);
  });

  afterAll(async () => ds.getRepository<Tag>(Tag).clear());

  it("should return 200 with tag data when valid ID is provided", async () => {
    const res = await req.get(`/id/${response.body.tag.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("tag");
  });

  it("should return 404 with errors description when tag is not found", async () => {
    const response = await req.get("/unregistered_tag");

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: "Could not find data related to unregistered_tag tag",
    });
  });
});
