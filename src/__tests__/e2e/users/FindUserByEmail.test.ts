import request from "supertest";
import { DataSource } from "typeorm";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { User } from "src/infra/database/typeORM/users/User.entity";
import { makeFakeCreateUserInput } from "src/__tests__/utils/UserMocks.factory";

describe("Find User by Email (GET /users/:email)", () => {
  const req = request("http://localhost:3030/dev/users");
  const userInput = makeFakeCreateUserInput();
  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();
    await req.post("/").send(userInput);
  });

  afterAll(async () => ds.getRepository<User>(User).clear());

  it("should return 200 with user data when valid email is provided", async () => {
    const response = await req.get(`/${userInput.email}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("user");
  });

  it("should return 400 with errors description when invalid email is provided", async () => {
    const response = await req.get("/invalid_email");

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: "Request contains invalid data",
      errors: ['"email" must be a valid email'],
    });
  });

  it("should return 404 with errors description when email address is not found", async () => {
    const response = await req.get("/unregistered@email.com");

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: "Could not find data related to unregistered@email.com address",
    });
  });
});
