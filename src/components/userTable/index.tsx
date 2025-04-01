import { User } from "@/domain/types/user";

interface UserTableProps {
  users?: User[];
}

const UserTable = ({ users }: UserTableProps) => {
  if (!users || users.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">No users found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto flex justify-center">
      <table className="min-w-full border border-gray-300 shadow-md rounded-lg text-center bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <td className="py-2 px-4 border text-gray-900 dark:text-gray-100">
                {user.id}
              </td>
              <td className="py-2 px-4 border text-gray-900 dark:text-gray-100">
                {user.name}
              </td>
              <td className="py-2 px-4 border text-gray-900 dark:text-gray-100">
                {user.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
