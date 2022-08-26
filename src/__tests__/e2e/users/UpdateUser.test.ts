import request from "supertest";
import { DataSource } from "typeorm";
import { randomUUID } from "crypto";

import { User } from "src/infra/database/typeORM/users/User.entity";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { makeFakeCreateUserInput } from "src/__tests__/utils/UserMocks.factory";

describe("Update User (PATCH /users)", () => {
  const req = request("http://localhost:3030/dev/users");

  const createUserInput = makeFakeCreateUserInput();
  const updateUserInput = { id: "any_id", name: "updated_name" };

  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();

    const { body } = await req.post("/").send(createUserInput);
    updateUserInput.id = body.user.id;
  });

  afterAll(async () => ds.getRepository<User>(User).clear());

  it("should return 200 with updated user data when valid data is provided", async () => {
    const response = await req.patch("/").send(updateUserInput);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("updated");
    expect(response.body).toHaveProperty("user");
  });

  it("should return 400 with errors description when invalid data is provided", async () => {
    const response = await req
      .patch("/")
      .send({ ...updateUserInput, email: "invalid_email" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: "Request contains invalid data",
      errors: ['"email" must be a valid email'],
    });
  });

  it("should return 404 with errors description when user is not found", async () => {
    const id = randomUUID();
    const response = await req.patch("/").send({ ...updateUserInput, id });

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: `Could not update: data related to ID ${id} not found`,
    });
  });
});
