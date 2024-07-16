import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddCartProduct from "./AddCartProduct";
import ProductShimmer from "../ShimmerUI/ProductShimmer/ProductShimmer";

const AddToCart = () => {
  const { id } = useParams();
  const idNum = id.slice(1);
  const [productItem, setProductItem] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${idNum}`
        );
        setProductItem(response.data);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setProductItem(null);
      }
    };

    fetchProduct();
  }, [idNum]);

  return productItem ? (
    <AddCartProduct productItem={productItem} />
  ) : (
    <ProductShimmer />
  );
};

export default AddToCart;
