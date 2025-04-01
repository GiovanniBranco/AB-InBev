"use client";

import UserForm from "@/components/userForm";
import UserTable from "@/components/userTable";
import type { User } from "@/domain/types/user";
import useUsers from "@/hooks/useUsers";
import { Fragment, useEffect, useState } from "react";

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);

  const { fetchUsers } = useUsers();

  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    loadUsers();
  }, [fetchUsers]);

  return (
    <Fragment>
      <UserForm
        onUserCreated={(newUser) => setUsers((prev) => [...prev, newUser])}
      />
      <UserTable users={users} />
    </Fragment>
  );
}
