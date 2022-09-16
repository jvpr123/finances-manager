import { Repository } from "typeorm";
import { Tag } from "./Tag.entity";

import { ITagModel } from "src/domain/models/Tag.model";
import { ICreateCategoryInput } from "src/domain/dto/categories/CreateCategory.dto";

import { ICreateTagRepository } from "src/data/protocols/database/tags/CreateTagRepository.interface";
import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";

export class TagTypeOrmRepository
  implements ICreateTagRepository, IFindTagsRepository
{
  constructor(private readonly repository: Repository<Tag>) {}

  async create(data: ICreateCategoryInput): Promise<ITagModel> {
    const categoryToCreate = this.repository.create(data);
    return await this.repository.save(categoryToCreate);
  }

  async findByTitle(title: string): Promise<ITagModel> {
    return await this.repository.findOneBy({ title });
  }

  async findById(id: string): Promise<ITagModel> {
    return await this.repository.findOneBy({ id });
  }
}
