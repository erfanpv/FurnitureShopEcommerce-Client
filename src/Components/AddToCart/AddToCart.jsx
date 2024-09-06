import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddCartProduct from "./AddCartProduct";
import ProductShimmer from "../ShimmerUI/ProductShimmer/ProductShimmer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductbyId } from "../../app/Slice/ProductsSlice/productThunk.js";
import ProductDetails from "../ShimmerUI/ProductViewShimmer/ProductViewShimmer.jsx";

const AddToCart = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productItem, isLoading } = useSelector((state) => state.productsAll);

  useEffect(() => {
    dispatch(fetchProductbyId({ id }));
  }, [dispatch, id]);

  if (isLoading) {
    return <ProductDetails />;
  }

  return productItem ? (
    <AddCartProduct productItem={productItem} />
  ) : (
    <ProductDetails />
  );
};

export default AddToCart;
