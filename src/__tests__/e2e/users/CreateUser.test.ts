import request from "supertest";
import { DataSource } from "typeorm";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { User } from "src/infra/database/typeORM/users/User.entity";
import { makeFakeCreateUserInput } from "src/__tests__/utils/UserMocks.factory";

describe("Create User (POST /users)", () => {
  const req = request("http://localhost:3030/dev/users");
  const userInput = makeFakeCreateUserInput();
  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();
  });

  beforeEach(async () => ds.getRepository<User>(User).clear());

  it("should return 201 with created user data when valid data is provided", async () => {
    const response = await req.post("/").send(userInput);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
  });

  it("should return 400 with errors description when invalid data is provided", async () => {
    const response = await req
      .post("/")
      .send({ ...userInput, email: "invalid_email" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: "Request contains invalid data",
      errors: ['"email" must be a valid email'],
    });
  });
});
