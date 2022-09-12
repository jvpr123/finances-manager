import {
  makeFakeCategory,
  makeFakeCreateCategoryInput,
} from "src/__tests__/utils/CategoryMocks.factory";

import {
  rejectValueOnce,
  resolveValue,
  // resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";
import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";

import { DataSource, Repository } from "typeorm";

import { Category } from "./Category.entity";
import { CategoryTypeOrmRepository } from "./CategoryTypeORM.repository";

describe("Category Repository - TypeORM", () => {
  let ds: DataSource;
  let repository: Repository<Category>;
  let sut: CategoryTypeOrmRepository;

  const inputData = makeFakeCreateCategoryInput();

  beforeAll(async () => {
    ds = await makeDataSource();
    repository = ds.getRepository<Category>(Category);
    sut = new CategoryTypeOrmRepository(repository);
  });

  beforeEach(async () => {
    await repository.clear();

    repository.create = jest.fn().mockReturnValue(makeFakeCategory());
    repository.save = resolveValue(makeFakeCategory());
  });

  afterAll(async () => await ds.destroy());

  describe("create()", () => {
    it("should call create() method from typeORM repository with correct values", async () => {
      await sut.create(inputData);
      expect(repository.create).toHaveBeenCalledWith(inputData);
    });

    it("should call save() method from typeORM repository with correct values", async () => {
      await sut.create(inputData);
      expect(repository.save).toHaveBeenCalledWith(makeFakeCategory());
    });

    it("should throw an error when typeORM repository throws", async () => {
      repository.save = rejectValueOnce(new Error());
      expect(sut.create(inputData)).rejects.toThrow(new Error());
    });

    it("should return an Category instance when operation succeeds", async () => {
      expect(sut.create(inputData)).resolves.toEqual(makeFakeCategory());
    });
  });

  // describe("findById()", () => {
  //   it("should call findOneBy() methodwith correct values", async () => {
  //     await sut.findById("valid_id");
  //     expect(repository.findOneBy).toHaveBeenCalledWith({
  //       id: "valid_id",
  //     });
  //   });

  //   it("should throw an error when typeORM repository throws", async () => {
  //     repository.findOneBy = rejectValueOnce(new Error());
  //     expect(sut.findById("valid_id")).rejects.toThrow(new Error());
  //   });

  //   it("should return an Transaction instance when operation succeeds", async () => {
  //     expect(sut.findById("valid_id")).resolves.toEqual(makeFakeCategory());
  //   });
  // });

  // describe("findAll()", () => {
  //   it("should call findAll() method with correct values", async () => {
  //     await sut.findAll();
  //     expect(repository.find).toHaveBeenCalledWith();
  //     expect(repository.find).toHaveBeenCalledTimes(1);
  //   });

  //   it("should throw an error when typeORM repository throws", async () => {
  //     repository.find = rejectValueOnce(new Error());
  //     expect(sut.findAll()).rejects.toThrow(new Error());
  //   });

  //   it("should return an array of Transaction instances when operation succeeds", async () => {
  //     expect(sut.findAll()).resolves.toEqual([makeFakeCategory()]);
  //   });

  //   it("should return an empty array when operation succeeds but no user is found", async () => {
  //     repository.find = resolveValueOnce([]);
  //     expect(sut.findAll()).resolves.toEqual([]);
  //   });
  // });

  // describe("update()", () => {
  //   const inputData = makeFakeUpdateTransactionInput(150);

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
  //     expect(sut.update(inputData)).rejects.toThrow(new Error());
  //   });

  //   it("should return a Transaction instance when operation succeeds", async () => {
  //     repository.findOneBy = resolveValueOnce(makeFakeCategory(150));
  //     expect(sut.update(inputData)).resolves.toEqual(makeFakeCategory(150));
  //   });
  // });

  // describe("delete()", () => {
  //   it("should call delete() method with correct values", async () => {
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
