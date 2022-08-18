import { hash } from "bcryptjs";
import { IEncrypter } from "@data/protocols/Encrypter.interface";

export class BcryptjsAdapter implements IEncrypter {
  constructor(private readonly salt: number) {}

  async hash(password: string): Promise<string> {
    return await hash(password, this.salt);
  }
}
