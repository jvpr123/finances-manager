import { ITagModel } from "src/domain/models/Tag.model";

export interface IFindTagsRepository {
  findByTitle(title: string): Promise<ITagModel>;
}