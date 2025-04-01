import { User } from "@/domain/types/user";
import UserService from "@/services/userService";

const useUsers = () => {
  const fetchUsers = async (): Promise<User[]> => {
    const users = await UserService.getAllUsers();
    return users;
  };

  return {
    fetchUsers,
  };
};

export default useUsers;
