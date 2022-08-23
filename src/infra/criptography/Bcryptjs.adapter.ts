import { hash } from "bcryptjs";
import { IEncrypter } from "src/data/protocols/Encrypter.interface";

export class BcryptjsAdapter implements IEncrypter {
  constructor(private readonly salt: number) {}

  async hash(password: string): Promise<string> {
    return await hash(password, this.salt);
  }
}
