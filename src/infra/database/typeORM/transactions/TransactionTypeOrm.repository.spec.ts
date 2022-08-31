import {
  makeFakeCreateTransactionDto,
  makeFakeTransaction,
} from "src/__tests__/utils/TransactionMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
} from "src/__tests__/utils/jest/MockReturnValues.factory";
import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";

import { DataSource, Repository } from "typeorm";

import { Transaction } from "./Transaction.entity";
import { TransactionTypeOrmRepository } from "./TransactionTypeORM.repository";

describe("Transaction Repository - TypeORM", () => {
  let ds: DataSource;
  let repository: Repository<Transaction>;
  let sut: TransactionTypeOrmRepository;

  const inputData = makeFakeCreateTransactionDto();

  beforeAll(async () => {
    ds = await makeDataSource();
    repository = ds.getRepository<Transaction>(Transaction);
    sut = new TransactionTypeOrmRepository(repository);
  });

  beforeEach(async () => {
    await repository.clear();
    repository.create = jest.fn().mockReturnValue(makeFakeTransaction());
    repository.save = resolveValue(makeFakeTransaction());
  });

  afterAll(async () => await ds.destroy());

  describe("create()", () => {
    it("should call create() method from typeORM repository with correct values", async () => {
      await sut.create(inputData);
      expect(repository.create).toHaveBeenCalledWith(inputData);
    });

    it("should call save() method from typeORM repository with correct values", async () => {
      await sut.create(inputData);
      expect(repository.save).toHaveBeenCalledWith(makeFakeTransaction());
    });

    it("should throw an error when typeORM repository throws", async () => {
      repository.save = rejectValueOnce(new Error());
      expect(sut.create(inputData)).rejects.toThrow(new Error());
    });

    it("should return an User instance when operation succeeds", async () => {
      expect(sut.create(inputData)).resolves.toEqual(makeFakeTransaction());
    });
  });

  // describe("findByEmail()", () => {
  //   it("should call findOneBy() method from typeORM repository with correct values", async () => {
  //     await sut.findByEmail("user@email.com");
  //     expect(repository.findOneBy).toHaveBeenCalledWith({
  //       email: "user@email.com",
  //     });
  //   });

  //   it("should throw an error when typeORM repository throws", async () => {
  //     repository.findOneBy = rejectValueOnce(new Error());
  //     expect(sut.findByEmail("user@email.com")).rejects.toThrow(new Error());
  //   });

  //   it("should return an User instance when operation succeeds", async () => {
  //     expect(sut.findByEmail("user@email.com")).resolves.toEqual(
  //       makeFakeUser()
  //     );
  //   });
  // });

  // describe("findById()", () => {
  //   it("should call findOneBy() method from typeORM repository with correct values", async () => {
  //     await sut.findById("valid_id");
  //     expect(repository.findOneBy).toHaveBeenCalledWith({
  //       id: "valid_id",
  //     });
  //   });

  //   it("should throw an error when typeORM repository throws", async () => {
  //     repository.findOneBy = rejectValueOnce(new Error());
  //     expect(sut.findById("valid_id")).rejects.toThrow(new Error());
  //   });

  //   it("should return an User instance when operation succeeds", async () => {
  //     expect(sut.findById("valid_id")).resolves.toEqual(makeFakeUser());
  //   });
  // });

  // describe("findAll()", () => {
  //   it("should call findAll() method from typeORM repository with correct values", async () => {
  //     await sut.findAll();
  //     expect(repository.find).toHaveBeenCalledTimes(1);
  //   });

  //   it("should throw an error when typeORM repository throws", async () => {
  //     repository.find = rejectValueOnce(new Error());
  //     expect(sut.findAll()).rejects.toThrow(new Error());
  //   });

  //   it("should return an array of User instances when operation succeeds", async () => {
  //     expect(sut.findAll()).resolves.toEqual([makeFakeUser()]);
  //   });

  //   it("should return an empty array when operation succeeds but no user is found", async () => {
  //     repository.find = resolveValueOnce([]);
  //     expect(sut.findAll()).resolves.toEqual([]);
  //   });
  // });

  // describe("update()", () => {
  //   const inputData = makeFakeUpdateUserInput();

  //   it("should call update() method from typeORM repository with correct values", async () => {
  //     const { id, ...data } = inputData;

  //     await sut.update(inputData);
  //     expect(repository.update).toHaveBeenCalledWith({ id }, data);
  //   });

  //   it("should call findOneBy() method from typeORM repository with correct values", async () => {
  //     await sut.update(inputData);

  //     expect(repository.findOneBy).toHaveBeenCalledWith({ id: inputData.id });
  //   });

  //   it("should throw an error when typeORM repository throws", async () => {
  //     repository.update = rejectValueOnce(new Error());
  //     expect(sut.update(makeFakeUpdateUserInput())).rejects.toThrow(
  //       new Error()
  //     );
  //   });

  //   it("should return an User instance when operation succeeds", async () => {
  //     expect(sut.update(makeFakeUpdateUserInput())).resolves.toEqual(
  //       makeFakeUser()
  //     );
  //   });
  // });

  // describe("delete()", () => {
  //   it("should call delete() method from typeORM repository with correct values", async () => {
  //     await sut.delete("valid_id");
  //     expect(repository.delete).toHaveBeenCalledWith({ id: "valid_id" });
  //   });

  //   it("should throw an error when typeORM repository throws", async () => {
  //     repository.delete = rejectValueOnce(new Error());
  //     expect(sut.delete("error")).rejects.toThrow(new Error());
  //   });

  //   it("should return true when operation succeeds", async () => {
  //     expect(sut.delete("valid_id")).resolves.toEqual(true);
  //   });
  // });
});