"use client";

import { CreateUpdateUserRequest } from "@/domain/types/user";
import { getQueryClient } from "@/infrastructure/reactQuery/reactQueryClient";
import UserService from "@/services/userService";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, Fragment, useState } from "react";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async (newUser: CreateUpdateUserRequest) => {
      await UserService.createUser(newUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsOpen(false);
      setName("");
      setEmail("");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newUser: CreateUpdateUserRequest = {
      name,
      email,
    };
    mutation.mutate(newUser);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add User
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg w-full max-w-md">
              <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Register User
              </DialogTitle>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="block text-gray-700 dark:text-gray-300">
                    Name:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 dark:text-gray-300">
                    Email:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UserForm;
