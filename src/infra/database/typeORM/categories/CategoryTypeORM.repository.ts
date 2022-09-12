import { Repository } from "typeorm";
import { Category } from "./Category.entity";

import { ICategoryModel } from "src/domain/models/Category.model";
import { ICreateCategoryInput } from "src/domain/dto/categories/CreateCategory.dto";

import { ICreateCategoryRepository } from "src/data/protocols/database/categories/CreateCategoryRepository.interface";

export class CategoryTypeOrmRepository implements ICreateCategoryRepository {
  constructor(private repository: Repository<Category>) {}

  async create(data: ICreateCategoryInput): Promise<ICategoryModel> {
    const categoryToCreate = this.repository.create(data);
    return await this.repository.save(categoryToCreate);
  }

  // async findById(id: string): Promise<ITransactionModel> {
  //   return await this.repository.findOneBy({ id });
  // }

  // async findAll(): Promise<ITransactionModel[]> {
  //   return await this.repository.find();
  // }

  // async update({
  //   id,
  //   ...data
  // }: IUpdateTransactionInput): Promise<ITransactionModel> {
  //   await this.repository.update({ id }, data);
  //   return await this.repository.findOneBy({ id });
  // }

  // async delete(id: string): Promise<boolean> {
  //   const result = await this.repository.delete({ id });
  //   return result.affected ? true : false;
  // }
}
