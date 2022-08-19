import { IEncrypter } from "@data/protocols/Encrypter.interface";
import bcrypt from "bcryptjs";
import { BcryptjsAdapter } from "./Bcryptjs.adapter";

describe("Bcryptjs Adapter", () => {
  beforeAll(() => {
    (bcrypt.hash as jest.Mock) = jest.fn().mockResolvedValue("hashed_password");
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
