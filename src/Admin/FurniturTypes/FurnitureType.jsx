import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminFurnitureCard from "../AdminProducts/AdminFurnitureCard/AdminCard";
import ProductShimmer from "../../Components/ShimmerUI/ProductShimmer/ProductShimmer";
import DropdownButton from "../../Components/Header/DropDownButton/DropDownButton";
import SearchInput from "../../Components/Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { getproductWithCategory } from "../../app/Slice/adminSlices/productSlices/adminProductThunk";

const FurnitureType = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category } = useParams();
  const { productWithCategory, isLoading } = useSelector((state) => state.adminProducts);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getproductWithCategory({ category }));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [category, dispatch]);

  return (
    <div className="">
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
        <DropdownButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center lg:ml-64 mt-5 mr-5 ml-5 md:ml-64 sm:ml-64">
        {isLoading ? (
          [...Array(6)].map((_, index) => <ProductShimmer key={index} />)
        ) : productWithCategory.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No products found in this category.
          </div>
        ) : (
          productWithCategory.map((productItem) => (
            <AdminFurnitureCard
              key={productItem._id}
              productItem={productItem}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FurnitureType;
