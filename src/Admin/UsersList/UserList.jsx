import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SearchInput from "../../Components/Search/Search";
import MyContext from "../../utils/Context";
import UserDeleteModal from "../../Components/Modal/DeleteModal/UserDeleteModal";

const UserList = () => {
  const { users, setUsers, openModal, closeModal, isModalOpen, setRender } = useContext(MyContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    fnName: "",
    lastName: "",
    email: "",
  });
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await axios.get("http://localhost:5000/users");
        setUsers(data.data);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers]);

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({
      fnName: user.fnName,
      lastName: user.lastName,
      email: user.email,
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setFormData({ fnName: "", lastName: "", email: "" });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/users/${editingUser}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const updatedUser = response.data;
      setUsers(
        users.map((user) => (user.id === editingUser ? updatedUser : user))
      );
      toast.success("Successfully updated");
      handleCancelEdit();
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <>
      <div className="flex justify-center">
        <SearchInput />
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-5 md:ml-64 sm:ml-10 lg:ml-64">
        <h2 className="text-2xl font-bold mb-6">User List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.fnName + " " + user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() =>
                        navigate(`/admin/userslist/viewcart/${user.id}`)
                      }
                    >
                      View Cart
                    </button>
                    <button
                      className="text-indigo-600 hover:text-indigo-900 ml-4"
                      onClick={() =>
                        navigate(`/admin/userslist/orders/${user.id}`)
                      }
                    >
                      Orders
                    </button>
                    <button
                      className="text-indigo-600 hover:text-indigo-900 ml-4"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 ml-4"
                      onClick={() => {
                        setUid(user.id);
                        openModal();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && <UserDeleteModal id={uid} closeModal={closeModal} setRender={setRender} />}

        {editingUser && (
          <form onSubmit={handleFormSubmit} className="mt-6">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                name="fnName"
                value={formData.fnName}
                onChange={handleFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              >
                Update
              </button>

              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-block rounded border border-rose-600 bg-rose-600 px-6 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-rose-600 focus:outline-none focus:ring active:text-rose-500"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default UserList;
