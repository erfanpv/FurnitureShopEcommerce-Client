import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../Components/Search/Search";
import MyContext from "../../utils/Context";
import UserDeleteModal from "../../Components/Modal/DeleteModal/UserDeleteModal";

const UserList = () => {
  const { users, setUsers, openModal, closeModal, isModalOpen, setRender } =
    useContext(MyContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await axios.get("http://localhost:5000/users");
        setUsers(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers]);

  if (loading) return <p className="text-center mt-6">Loading...</p>;

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
        {isModalOpen && (
          <UserDeleteModal
            id={uid}
            closeModal={closeModal}
            setRender={setRender}
          />
        )}
      </div>
    </>
  );
};

export default UserList;
