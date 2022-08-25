import request from "supertest";
import { DataSource } from "typeorm";

import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import { User } from "src/infra/database/typeORM/users/User.entity";
import { makeFakeUserInput } from "src/__tests__/utils/UserMocks.factory";
import { IUserModel } from "../../../domain/models/User.model";

describe("Delete User (DELETE /users/:id)", () => {
  const req = request("http://localhost:3030/dev/users");
  const userInput = makeFakeUserInput();

  let ds: DataSource;
  let userData: Omit<IUserModel, "password">;

  beforeAll(async () => {
    ds = await makeDataSource();

    const { body } = await req.post("/").send(userInput);
    userData = body.user;
  });

  afterAll(async () => ds.getRepository<User>(User).clear());

  it("should return 200 when valid id is provided", async () => {
    const response = await req.delete(`/${userData.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ isDeleted: true });
  });

  it("should return 404 when id provided is not found", async () => {
    const response = await req.delete("/invalid_id");

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: "Could not delete: data related to ID invalid_id not found",
    });
  });
});
