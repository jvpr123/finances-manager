import { Repository } from "typeorm";
import { Tag } from "./Tag.entity";

import { ITagModel } from "src/domain/models/Tag.model";
import { ICreateCategoryInput } from "src/domain/dto/categories/CreateCategory.dto";

import { ICreateTagRepository } from "src/data/protocols/database/tags/CreateTagRepository.interface";

export class TagTypeOrmRepository implements ICreateTagRepository {
  constructor(private readonly repository: Repository<Tag>) {}

  async create(data: ICreateCategoryInput): Promise<ITagModel> {
    const categoryToCreate = this.repository.create(data);
    return await this.repository.save(categoryToCreate);
  }
}
