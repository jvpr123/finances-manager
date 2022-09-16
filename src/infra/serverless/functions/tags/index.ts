import createTag from "./create/CreateTagEvent";
import findTagByTitle from "./findByTitle/FindTagByTitleEvent";
import findTagById from "./findById/FindTagByIdEvent";
import findAllTags from "./findAll/FindAllTagsEvent";
import deleteTag from "./delete/DeleteTagEvent";

export default {
  createTag,
  findTagByTitle,
  findTagById,
  findAllTags,
  deleteTag,
};
