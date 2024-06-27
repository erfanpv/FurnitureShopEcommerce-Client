import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyContext from "../../utils/Context";
import AdminFurnitureCard from "../AdminProducts/AdminFurnitureCard/AdminCard";
import ProductShimmer from "../../Components/ShimmerUI/ProductShimmer/ProductShimmer";
import DropdownButton from "../../Components/Header/DropDownButton/DropDownButton";
import SearchInput from "../../Components/Search/Search";

const FurnitureType = () => {
  const navigate = useNavigate();
  const { filteredItems, } = useContext(MyContext);
  const { type } = useParams();
  const [productItems, setProductItems] = useState(filteredItems || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProductItems(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  console.log(productItems);

  const filteredProducts = productItems.filter(
    (productItem) => productItem.type.toLowerCase() === type
  );

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center md:ml-64 sm:ml-64 lg:ml-64 mt-5 mr-5 ml-5">
        {filteredProducts.length === 0 ? (
          <ProductShimmer />
        ) : (
          filteredProducts.map((productItem) => (
            <AdminFurnitureCard
              key={productItem.id}
              productItem={productItem}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FurnitureType;
