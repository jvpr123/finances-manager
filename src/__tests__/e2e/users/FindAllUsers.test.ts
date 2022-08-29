import request from "supertest";
import { DataSource } from "typeorm";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { User } from "src/infra/database/typeORM/users/User.entity";
import { makeFakeCreateUserInput } from "src/__tests__/utils/UserMocks.factory";

describe("Find All Users (GET /users)", () => {
  const req = request("http://localhost:3030/dev/users");
  let ds: DataSource;

  beforeAll(async () => {
    ds = await makeDataSource();
    await req.post("/").send(makeFakeCreateUserInput());
  });

  afterEach(async () => ds.getRepository<User>(User).clear());

  it("should return 200 with users data when request succeeds", async () => {
    const response = await req.get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("users");
  });

  it("should return 200 with empty array when no user is registered", async () => {
    const response = await req.get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      users: [],
    });
  });
});
