import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddCartProduct from "./AddCartProduct";
import ProductShimmer from "../ShimmerUI/ProductShimmer/ProductShimmer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductbyId } from "../../app/Slice/ProductsSlice/productThunk.js";

const AddToCart = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productItem, isLoading } = useSelector((state) => state.productsAll);

  useEffect(() => {
    dispatch(fetchProductbyId({ id }));
  }, [dispatch, id]);

  if (isLoading) {
    return <ProductShimmer />;
  }

  return productItem ? (
    <AddCartProduct productItem={productItem} />
  ) : (
    <ProductShimmer />
  );
};

export default AddToCart;
