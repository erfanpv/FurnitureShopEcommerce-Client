import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../../utils/Context";
import DeleteModal from "../../../Components/Modal/DeleteModal/DeleteModal";

const AdminFurnitureCard = ({ productItem }) => {
  const {openModal} = useContext(MyContext);
  const navigate = useNavigate();
  const [pid, setPid] = useState(null);

  const handleEdit = async (id) => {
    navigate(`/admin/productlist/update/${id}`);
  };

  return (
    <>
      <div className="max-w-sm rounded-md overflow-hidden shadow-lg mb-10 bg-white">
        <img
          className="w-96 h-60"
          style={{ objectFit: "cover" }}
          src={productItem.image}
          alt="Furniture"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{productItem.productName}</div>
          <p className="font-bold mb-2">${productItem.price}</p>
          <p className="text-gray-700 text-base">{productItem.description}</p>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #furniture
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            #{productItem.category.toLowerCase()}
          </span>
        </div>
        <div className="px-8 pt-2 pb-5 flex justify-between">
          <button
            onClick={() => handleEdit(productItem._id)}
            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          >
            Update
          </button>

          <button
            onClick={() => {
              setPid(productItem._id);
              openModal();
            }}
            className="inline-block rounded border border-rose-600 bg-rose-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-rose-600 focus:outline-none focus:ring active:text-rose-500"
          >
            Delete
          </button>
        </div>
      </div>
      {pid && <DeleteModal id={pid} />}
    </>
  );
};

export default AdminFurnitureCard;
