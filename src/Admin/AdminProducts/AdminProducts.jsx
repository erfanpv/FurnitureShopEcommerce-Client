import React, { useContext, useEffect } from "react";
import AdminFurnitureCard from "./AdminFurnitureCard/AdminCard";
import MyContext from "../../utils/Context";
import axios from "axios";
import ProductShimmer from "../../Components/ShimmerUI/ProductShimmer/ProductShimmer";
import { useNavigate } from "react-router-dom";
import DropDownButton from "../../Components/Header/DropDownButton/DropDownButton";
import SearchInput from "../../Components/Search/Search";

const AdminProducts = () => {
  const navigate = useNavigate(0);
  const { filteredItems, setFilteredItems, render } = useContext(MyContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setFilteredItems(res?.data));
  }, [render]);

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
        {filteredItems?.length === 0 ? (
          <ProductShimmer />
        ) : (
          filteredItems.map((productItem) => {
            return (
              <AdminFurnitureCard
                productItem={productItem}
                key={productItem.id}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default AdminProducts;
