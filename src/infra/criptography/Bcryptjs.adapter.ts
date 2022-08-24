import { IEncrypter } from "src/data/protocols/Encrypter.interface";
import { hash } from "bcryptjs";

export class BcryptjsAdapter implements IEncrypter {
  constructor(private readonly salt: number) {}

  async hash(password: string): Promise<string> {
    return await hash(password, this.salt);
  }
}
