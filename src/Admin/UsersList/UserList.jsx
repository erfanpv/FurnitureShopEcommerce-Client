import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../Components/Search/Search";
import MyContext from "../../utils/Context";
import ToggleBlockUser from "../../Components/Modal/DeleteModal/ToggleBlockUser";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../app/Slice/adminSlices/userMangementSlices/umsThunk";

const UserList = () => {
  const { openModal, closeModal, isModalOpen } = useContext(MyContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allUsers, isLoading, pagination } = useSelector((state) => state.userManger);

  const [uid, setUid] = useState(null);
  const [isBlocked, setBlocked] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    dispatch(getAllUsers({ page: currentPage, limit: 10 })); 
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <>
      <div className="flex justify-center">
        <SearchInput userSearch={true} />
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-5 md:ml-64 sm:ml-10 lg:ml-64">
        <h2 className="text-2xl font-bold mb-6">User List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allUsers.map((user, index) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(currentPage - 1) * 10 + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.firstName + " " + user.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 ml-4"
                      onClick={() => navigate(`/admin/userslist/orders/${user._id}`)}
                    >
                      Orders
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 ml-4"
                      onClick={() => {
                        setUid(user._id);
                        openModal();
                        setBlocked(user.is_blocked);
                      }}
                    >
                      {user.is_blocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <ul className="inline-flex -space-x-px">
            {[...Array(pagination.totalPages).keys()].map((number) => (
              <li key={number} className="px-2">
                <button
                  onClick={() => handlePageChange(number + 1)}
                  className={`px-3 py-2 leading-tight border ${
                    currentPage === number + 1 ? "bg-indigo-600 text-white" : "bg-white text-gray-700"
                  } rounded-md`}
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {isModalOpen && (
          <ToggleBlockUser id={uid} closeModal={closeModal} is_blocked={isBlocked} />
        )}
      </div>
    </>
  );
};

export default UserList;
