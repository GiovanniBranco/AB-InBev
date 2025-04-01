"use client";

import { CreateUpdateUserRequest, User } from "@/domain/types/user";
import UserService from "@/services/userService";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { FormEvent, Fragment, useState } from "react";

interface UserFormProps {
  onUserCreated: (newUser: User) => void;
}

const UserForm = ({ onUserCreated }: UserFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newUserRequest: CreateUpdateUserRequest = { name, email };

    UserService.createUser(newUserRequest)
      .then((createdUser) => {
        alert("User created successfully!");
        setName("");
        setEmail("");
        setIsOpen(false);

        onUserCreated(createdUser);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        alert("Failed to create user. Please try again.");
      });
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
