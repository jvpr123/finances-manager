import createCategory from "./create/CreateCategoryEvent";
import findCategoryByTitle from "./findByName/FindCategoryByTitleEvent";
import findCategoryById from "./findById/FindCategoryByIdEvent";
import findAllCategories from "./findAll/FindAllCategoriesEvent";
import updateCategory from "./update/UpdateCategoryEvent";
import DeleteCategory from "./delete/DeleteCategoryEvent";

export default {
  createCategory,
  findCategoryByTitle,
  findCategoryById,
  findAllCategories,
  updateCategory,
  DeleteCategory,
};
