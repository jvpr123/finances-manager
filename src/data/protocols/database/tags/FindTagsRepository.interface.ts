import { ITagModel } from "src/domain/models/Tag.model";

export interface IFindTagsRepository {
  findByTitle(title: string): Promise<ITagModel>;
  findById(id: string): Promise<ITagModel>;
  findAll(): Promise<ITagModel[]>;
}
