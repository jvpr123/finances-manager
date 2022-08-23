import { resolveValue } from "@core/__tests__/utils/jest/MockReturnValues.factory";

import bcrypt from "bcryptjs";
import { BcryptjsAdapter } from "./Bcryptjs.adapter";
import { IEncrypter } from "@core/data/protocols/Encrypter.interface";

describe("Bcryptjs Adapter", () => {
  beforeAll(() => {
    (bcrypt.hash as jest.Mock) = resolveValue("hashed_password");
  });

  const sut: IEncrypter = new BcryptjsAdapter(12);

  it("should call hash() method with correct values", async () => {
    await sut.hash("valid_password");
    expect(bcrypt.hash).toHaveBeenCalledWith("valid_password", 12);
  });

  it("should return hashed password when operation succeeds", async () => {
    expect(sut.hash("valid_password")).resolves.toEqual("hashed_password");
  });
});
