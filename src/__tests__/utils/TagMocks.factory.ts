import { ICreateTagInput } from "src/domain/dto/tags/CreateTag.dto";
import { IUpdateTagInput } from "src/domain/dto/tags/UpdateTag.dto";
import { ITagModel } from "src/domain/models/Tag.model";

export const makeFakeCreateTagInput = (): ICreateTagInput => ({
  title: "tag_title",
  description: "tag_description",
  color: "#000000",
});

export const makeFakeUpdateTagInput = (): IUpdateTagInput => ({
  id: "tag_id",
  title: "new_tag_title",
  description: "new_tag_description",
  color: "#222222",
});

export const makeFakeTag = (): ITagModel => {
  const data = makeFakeCreateTagInput();

  return {
    id: "tag_id",
    ...data,
    createdAt: new Date(2022),
    updatedAt: new Date(2022),
  };
};
