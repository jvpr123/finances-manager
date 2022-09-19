import request from "supertest";
import { DataSource } from "typeorm";
import { randomUUID } from "crypto";

import { Tag } from "src/infra/database/typeORM/tags/Tag.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import {
  makeFakeCreateTagInput,
  makeFakeUpdateTagInput,
} from "src/__tests__/utils/TagMocks.factory";

describe("Update Tag (PATCH /tags)", () => {
  const req = request("http://localhost:3030/dev/tags");

  const createTagInput = makeFakeCreateTagInput();
  const updateTagInput = makeFakeUpdateTagInput();

  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();

    const { body } = await req.post("/").send(createTagInput);
    updateTagInput.id = body?.tag?.id;
  });

  afterAll(async () => ds.getRepository<Tag>(Tag).clear());

  it("should return 200 with updated tag data when valid data is provided", async () => {
    const response = await req.patch("/").send(updateTagInput);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("updated");
    expect(response.body).toHaveProperty("tag");
  });

  it("should return 400 with errors description when invalid data is provided", async () => {
    const response = await req
      .patch("/")
      .send({ ...updateTagInput, title: "" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: "Request contains invalid data",
      errors: ['"title" is not allowed to be empty'],
    });
  });

  it("should return 404 with errors description when tag is not found", async () => {
    const id = randomUUID();
    const response = await req
      .patch("/")
      .send({ ...updateTagInput, id, title: "other_title" });

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: `Could not update: data related to ID provided not found`,
    });
  });
});
