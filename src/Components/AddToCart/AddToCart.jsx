import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddCartProduct from "./AddCartProduct";
import MyContext from "../../utils/Context";
import axios from "axios";

const AddToCart = () => {
  const { filteredItems, setFilteredItems, user } = useContext(MyContext);
  const { id } = useParams();
  const idNum = Number(id.slice(1));
  console.log(idNum);

  const [productItem, setProductItem] = useState(() => {
    return filteredItems.find((item) => item.id === idNum);
  });

  useEffect(() => {
    if (!productItem) {
      // Fetch product data if not found in filteredItems
      axios
        .get(`http://localhost:5000/products/${idNum}`)
        .then((res) => setProductItem(res.data))
        .catch((err) => console.log("Error fetching product data:", err));
    }
  }, [idNum, productItem]);

  return productItem ? (
    <AddCartProduct productItem={productItem} />
  ) : (
    <div>Loading...</div>
  );
};

export default AddToCart;
