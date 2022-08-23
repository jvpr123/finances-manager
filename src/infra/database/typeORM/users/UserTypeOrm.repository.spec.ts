import { DataSource, Repository } from "typeorm";

import { User } from "./User.entity";
import { IUserRepository } from "src/data/protocols/UserRepository.interface";
import { UserTypeOrmRepository } from "./UserTypeORM.repository";
import {
  makeFakeUser,
  makeFakeUserDto,
} from "src/__tests__/utils/UserMocks.factory";
import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";

describe("User Repository - TypeORM", () => {
  let ds: DataSource;
  let repository: Repository<User>;
  let sut: IUserRepository;

  beforeAll(async () => {
    ds = await makeDataSource();
    repository = ds.getRepository<User>(User);
    sut = new UserTypeOrmRepository(repository);
  });

  beforeEach(async () => {
    await repository.clear();

    repository.create = jest.fn().mockReturnValue(makeFakeUser());
    repository.save = jest.fn().mockResolvedValue(makeFakeUser());
  });

  afterAll(async () => await ds.destroy());

  describe("create()", () => {
    it("should call create() method from typeORM repository with correct values", async () => {
      const userData = makeFakeUserDto();

      await sut.create(userData);
      expect(repository.create).toHaveBeenCalledWith(userData);
    });

    it("should call save() method from typeORM repository with correct values", async () => {
      await sut.create(makeFakeUserDto());
      expect(repository.save).toHaveBeenCalledWith(makeFakeUser());
    });

    it("should throw an error when typeORM repository throws", async () => {
      repository.save = jest.fn().mockRejectedValueOnce(new Error());
      expect(sut.create(makeFakeUserDto())).rejects.toThrow(new Error());
    });

    it("should return an User instance when operation succeeds", async () => {
      expect(sut.create(makeFakeUserDto())).resolves.toEqual(makeFakeUser());
    });
  });
});
