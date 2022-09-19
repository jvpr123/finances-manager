import { makeDataSource } from "src/__tests__/utils/typeORM/DataSource.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";
import {
  makeFakeCreateTagInput,
  makeFakeUpdateTagInput,
  makeFakeTag,
} from "src/__tests__/utils/TagMocks.factory";

import { DataSource, Repository } from "typeorm";

import { Tag } from "./Tag.entity";
import { TagTypeOrmRepository } from "./TagTypeORM.repository";

describe("Tag Repository - TypeORM", () => {
  let ds: DataSource;
  let repository: Repository<Tag>;
  let sut: TagTypeOrmRepository;

  const inputData = makeFakeCreateTagInput();

  beforeAll(async () => {
    ds = await makeDataSource();
    repository = ds.getRepository<Tag>(Tag);
    sut = new TagTypeOrmRepository(repository);
  });

  beforeEach(async () => {
    await repository.clear();

    repository.create = jest.fn().mockReturnValue(makeFakeTag());
    repository.save = resolveValue(makeFakeTag());
    repository.findOneBy = resolveValue(makeFakeTag());
    repository.find = resolveValue([makeFakeTag()]);
    repository.update = resolveValue(makeFakeTag());
    repository.delete = resolveValue({ affected: 1 });
  });

  afterAll(async () => await ds.destroy());

  describe("create()", () => {
    it("should call create() method from typeORM repository with correct values", async () => {
      await sut.create(inputData);
      expect(repository.create).toHaveBeenCalledWith(inputData);
    });

    it("should call save() method from typeORM repository with correct values", async () => {
      await sut.create(inputData);
      expect(repository.save).toHaveBeenCalledWith(makeFakeTag());
    });

    it("should throw an error when typeORM repository throws", async () => {
      repository.save = rejectValueOnce(new Error());
      expect(sut.create(inputData)).rejects.toThrow(new Error());
    });

    it("should return an Tag instance when operation succeeds", async () => {
      expect(sut.create(inputData)).resolves.toEqual(makeFakeTag());
    });
  });

  describe("findByTitle()", () => {
    it("should call findOneBy() method with correct values", async () => {
      await sut.findByTitle("tag_title");
      expect(repository.findOneBy).toHaveBeenCalledWith({
        title: "tag_title",
      });
    });

    it("should throw an error when typeORM repository throws", async () => {
      repository.findOneBy = rejectValueOnce(new Error());
      expect(sut.findByTitle("tag_title")).rejects.toThrow(new Error());
    });

    it("should return a Tag instance when operation succeeds", async () => {
      expect(sut.findByTitle("tag_title")).resolves.toEqual(makeFakeTag());
    });
  });

  describe("findById()", () => {
    it("should call findOneBy() method with correct values", async () => {
      await sut.findById("tag_id");
      expect(repository.findOneBy).toHaveBeenCalledWith({
        id: "tag_id",
      });
    });

    it("should throw an error when typeORM repository throws", async () => {
      repository.findOneBy = rejectValueOnce(new Error());
      expect(sut.findById("tag_id")).rejects.toThrow(new Error());
    });

    it("should return an Category instance when operation succeeds", async () => {
      expect(sut.findById("tag_id")).resolves.toEqual(makeFakeTag());
    });
  });

  describe("findAll()", () => {
    it("should call findAll() method with correct values", async () => {
      await sut.findAll();
      expect(repository.find).toHaveBeenCalledWith();
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when typeORM repository throws", async () => {
      repository.find = rejectValueOnce(new Error());
      expect(sut.findAll()).rejects.toThrow(new Error());
    });

    it("should return an array of Tag instances when operation succeeds", async () => {
      expect(sut.findAll()).resolves.toEqual([makeFakeTag()]);
    });

    it("should return an empty array when operation succeeds but no user is found", async () => {
      repository.find = resolveValueOnce([]);
      expect(sut.findAll()).resolves.toEqual([]);
    });
  });

  describe("update()", () => {
    const inputData = makeFakeUpdateTagInput();

    it("should call update() method from typeORM repository with correct values", async () => {
      const { id, ...data } = inputData;

      await sut.update(inputData);
      expect(repository.update).toHaveBeenCalledWith({ id }, data);
    });

    it("should call findOneBy() method from typeORM repository with correct values", async () => {
      await sut.update(inputData);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: inputData.id });
    });

    it("should throw an error when typeORM repository throws", async () => {
      repository.update = rejectValueOnce(new Error());
      expect(sut.update(inputData)).rejects.toThrow(new Error());
    });

    it("should return a TagModel instance when operation succeeds", async () => {
      repository.findOneBy = resolveValueOnce(makeFakeTag());
      expect(sut.update(inputData)).resolves.toEqual(makeFakeTag());
    });
  });

  describe("delete()", () => {
    it("should call delete() method with correct values", async () => {
      await sut.delete("valid_id");
      expect(repository.delete).toHaveBeenCalledWith({ id: "valid_id" });
    });

    it("should throw an error when typeORM repository throws", async () => {
      repository.delete = rejectValueOnce(new Error());
      expect(sut.delete("error")).rejects.toThrow(new Error());
    });

    it("should return true when operation succeeds", async () => {
      expect(sut.delete("valid_id")).resolves.toEqual(true);
    });
  });
});
