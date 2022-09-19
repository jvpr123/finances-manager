import { Repository } from "typeorm";
import { Tag } from "./Tag.entity";

import { ITagModel } from "src/domain/models/Tag.model";
import { ICreateCategoryInput } from "src/domain/dto/categories/CreateCategory.dto";

import { ICreateTagRepository } from "src/data/protocols/database/tags/CreateTagRepository.interface";
import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";
import { IUpdateTagRepository } from "src/data/protocols/database/tags/UpdateTagRepository.interface";
import { IDeleteTagRepository } from "src/data/protocols/database/tags/DeleteTagRepository.interface";
import { IUpdateTagInput } from "src/domain/dto/tags/UpdateTag.dto";

export class TagTypeOrmRepository
  implements
    ICreateTagRepository,
    IFindTagsRepository,
    IUpdateTagRepository,
    IDeleteTagRepository
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

  async findAll(): Promise<ITagModel[]> {
    return await this.repository.find();
  }

  async update({ id, ...data }: IUpdateTagInput): Promise<ITagModel> {
    await this.repository.update({ id }, data);
    return await this.repository.findOneBy({ id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return result?.affected ? true : false;
  }
}
