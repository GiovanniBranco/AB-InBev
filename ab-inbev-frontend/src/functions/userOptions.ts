"use client";

import { queryOptions } from "@tanstack/react-query";
import { User } from "@/domain/types/user";
import UserService from "@/services/userService";

export const fetchUsers = async (): Promise<User[]> => {
  const users = await UserService.getAllUsers();
  return users;
};

export const usersOptions = queryOptions({
  queryKey: ["users"],
  queryFn: fetchUsers,
});
