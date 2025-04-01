import { CreateUpdateUserRequest } from "@/domain/types/user";
import { axiosClient } from "@/infrastructure/httpClient/axiosClient";

class UserService {
  async createUser(newUser: CreateUpdateUserRequest) {
    return await axiosClient.post("users", newUser).then((response) => {
      if (response.status !== 201)
        throw new Error(`Error creating user: ${response.statusText}`);

      return response.data;
    });
  }

  async getAllUsers() {
    const response = await axiosClient.get("users");

    if (response.status !== 200)
      throw new Error(`Error fetching users: ${response.statusText}`);

    return response.data;
  }
}

export default new UserService() as UserService;
