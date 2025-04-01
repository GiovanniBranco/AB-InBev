export type User = {
  id: number;
  email: string;
  name: string;
};

export type CreateUpdateUserRequest = {
  name: string;
  email: string;
};
