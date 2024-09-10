import React, { useContext, useEffect } from "react";
import AdminFurnitureCard from "./AdminFurnitureCard/AdminCard";
import MyContext from "../../utils/Context";
import axios from "axios";
import ProductShimmer from "../../Components/ShimmerUI/ProductShimmer/ProductShimmer";
import { useNavigate } from "react-router-dom";
import DropDownButton from "../../Components/Header/DropDownButton/DropDownButton";
import SearchInput from "../../Components/Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllProducts } from "../../app/Slice/adminSlices/productSlices/adminProductThunk";

const AdminProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filteredItems, setFilteredItems, render } = useContext(MyContext);

  const { products, isLoading } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(adminGetAllProducts());
  }, []);

  return (
    <>
      <div className="flex justify-center mt-0">
        <SearchInput />
      </div>

      <div className="flex  mr-5 items-center justify-between">
        <button
          className="inline-block rounded border border-rose-600 bg-rose-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-rose-600 focus:outline-none focus:ring active:text-rose-500 lg:ml-64 mt-5 mr-5 ml-5 md:ml-64 sm:ml-64"
          onClick={() => navigate("/admin/productlist/addproduct")}
        >
          Add Product
        </button>

        <DropDownButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center lg:ml-64 mt-5 mr-5 ml-5 md:ml-64 sm:ml-64">
        {isLoading ? (
          [...Array(6)].map((_, index) => <ProductShimmer key={index} />)
        ) : products?.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        ) : (
          products.map((productItem) => {
            return (
              <AdminFurnitureCard
                productItem={productItem}
                key={productItem._id}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default AdminProducts;
