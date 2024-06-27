import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddCartProduct from "./AddCartProduct";
import MyContext from "../../utils/Context";
import axios from "axios";
import ProdutShimmer from "../ShimmerUI/ProductShimmer/ProductShimmer";

const AddToCart = () => {
  const { filteredItems } = useContext(MyContext);
  const { id } = useParams();
  const idNum = id.slice(1); 

  const [productItem, setProductItem] = useState(null); 

  useEffect(() => {
    const foundProduct = filteredItems.find((item) => item.id === idNum);
    if (foundProduct) {
      setProductItem(foundProduct);
    } else {
      axios
        .get(`http://localhost:5000/products/${idNum}`)
        .then((res) => setProductItem(res.data))
        .catch((err) => {
          console.log("Error fetching product data:", err);
          setProductItem(null); 
        });
    }
  }, [idNum, filteredItems]);

  return productItem ? <AddCartProduct productItem={productItem} /> : <ProdutShimmer />;
};

export default AddToCart;
