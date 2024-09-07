import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddCartProduct from "./AddCartProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductbyId } from "../../app/Slice/ProductsSlice/productThunk.js";
import SingleProductShimmer from "../ShimmerUI/ProductViewShimmer/ProductViewShimmer.jsx";

const AddToCart = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productItem, isLoading } = useSelector((state) => state.productsAll);

  useEffect(() => {
    dispatch(fetchProductbyId({ id }));
  }, [dispatch, id]);

  if (isLoading) {
    return <SingleProductShimmer />;
  }

  return productItem ? (
    <AddCartProduct productItem={productItem} />
  ) : (
    <SingleProductShimmer />
  );
};

export default AddToCart;
