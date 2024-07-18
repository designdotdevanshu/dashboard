"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { MdClose, MdDelete, MdEdit } from "react-icons/md";

type User = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  paid: number;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>(() => {
    // Initialize users from localStorage, or default to an empty array
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("users");
      return storedUsers ? JSON.parse(storedUsers) : [];
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserActive, setNewUserActive] = useState(false);
  const [newUserPaid, setNewUserPaid] = useState(0);

  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editUserName, setEditUserName] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const [editUserActive, setEditUserActive] = useState(false);
  const [editUserPaid, setEditUserPaid] = useState(0);

  // Update localStorage whenever users state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  const addUser = () => {
    setShowForm(true);
    setEditUserId(null);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserActive(false);
    setNewUserPaid(0);
  };

  const editUser = (id: string) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setEditUserId(id);
      setEditUserName(userToEdit.name);
      setEditUserEmail(userToEdit.email);
      setEditUserActive(userToEdit.active);
      setEditUserPaid(userToEdit.paid);
      setShowForm(true);
    }
  };

  const handleClearForm = () => {
    setNewUserName("");
    setNewUserEmail("");
    setNewUserActive(false);
    setNewUserPaid(0);
    setEditUserId(null);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditUserId(null);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editUserId) {
      // Update existing user
      const updatedUsers =
        users &&
        users.map((user) =>
          user.id === editUserId
            ? {
                ...user,
                name: editUserName,
                email: editUserEmail,
                active: editUserActive,
                paid: editUserPaid,
              }
            : user,
        );
      setUsers(updatedUsers);
    } else {
      // Create a new user
      const newUser: User = {
        id: String(users.length + 1),
        name: newUserName,
        email: newUserEmail,
        active: newUserActive,
        paid: newUserPaid,
      };
      setUsers([...users, newUser]);
    }

    // Reset form state
    handleClearForm();

    // Hide the form
    handleClose();
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="relative">
      <h1 className="mb-4 text-2xl font-bold">User Management</h1>
      <button onClick={addUser} className="rounded bg-green-500 px-4 py-2 text-white">
        Add User
      </button>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-slate-950 bg-opacity-50">
          <div className="relative rounded bg-white p-8 shadow-lg dark:bg-slate-950 dark:shadow-white">
            <div className="absolute right-4 top-4">
              <button type="button" onClick={handleClose} className="text-red-500">
                <MdClose size={24} />
              </button>
            </div>
            <h2 className="mb-4 text-xl font-bold">{editUserId ? "Edit User" : "Add New User"}</h2>
            <input type="text" placeholder="Enter name" value={editUserId ? editUserName : newUserName} onChange={editUserId ? (e) => setEditUserName(e.target.value) : (e) => setNewUserName(e.target.value)} className="mb-4 w-full border border-gray-300 px-2 py-1" required />
            <input type="email" placeholder="Enter email" value={editUserId ? editUserEmail : newUserEmail} onChange={editUserId ? (e) => setEditUserEmail(e.target.value) : (e) => setNewUserEmail(e.target.value)} className="mb-4 w-full border border-gray-300 px-2 py-1" required />
            <label className="mb-4 flex items-center gap-x-2">
              Active
              <Switch checked={editUserId ? editUserActive : newUserActive} onCheckedChange={editUserId ? setEditUserActive : setNewUserActive} />
            </label>
            <input type="number" placeholder="Enter amount paid" value={editUserId ? editUserPaid : newUserPaid} onChange={editUserId ? (e) => setEditUserPaid(Number(e.target.value)) : (e) => setNewUserPaid(Number(e.target.value))} className="mb-4 w-full border border-gray-300 px-2 py-1" required />
            <div className="flex justify-between">
              <button type="button" onClick={handleClose} className="rounded bg-red-500 px-4 py-2 text-white">
                Cancel
              </button>
              <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
                {editUserId ? "Save Changes" : "Submit"}
              </button>
            </div>
          </div>
        </form>
      )}

      <ul className="mt-4">
        {users &&
          users.map((user) => (
            <li key={user.id} className="flex justify-between border-b p-2">
              <span>
                {user.name} ({user.email})
              </span>
              <div>
                <button onClick={() => editUser(user.id)} className="mr-2 text-blue-500">
                  <MdEdit size={24} />
                </button>
                <button onClick={() => deleteUser(user.id)} className="text-red-500">
                  <MdDelete size={24} />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Users;
