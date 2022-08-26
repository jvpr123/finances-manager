import createUser from "@functions/users/create/CreateUserEvent";
import findUserByEmail from "@functions/users/findByEmail/FindUserByEmailEvent";
import findAllUsers from "@functions/users/findAll/FindAllUsersEvent";
import updateUser from "@functions/users/update/UpdateUserEvent";
import deleteUser from "@functions/users/delete/DeleteUserEvent";

export default {
  createUser,
  findUserByEmail,
  findAllUsers,
  updateUser,
  deleteUser,
};
