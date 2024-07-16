import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FurnitureCard from "../ProductCard/Cards";
import ProductShimmer from "../../ShimmerUI/ProductShimmer/ProductShimmer";
import MyContext from "../../../utils/Context";
import { useSelector } from "react-redux";

const CatogoryCard = () => {
  const { filteredItems } = useContext(MyContext);
  const { type } = useParams();
  const [productItems, setProductItems] = useState(filteredItems || []);
  const { products  }= useSelector((state) => state.productsAll);
  console.log(products);

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

  const filteredProducts = productItems.filter(
    (productItem) => productItem.type.toLowerCase() === type
  );

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-10 mr-5 ml-5">
        {filteredProducts.length === 0 ? (
          <ProductShimmer />
        ) : (
          filteredProducts.map((productItem) => (
            <FurnitureCard key={productItem.id} productItem={productItem} />
          ))
        )}
      </div>
    </div>
  );
};

export default CatogoryCard;
