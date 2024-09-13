import React from "react";
import SingleCart from "./SingleProductCart/SingleCart";
import OrderSummary from "./OrderSummary/OrderSummary";
import { useSelector } from "react-redux";
import CartShimmer from "../ShimmerUI/CartShimmer/CartShimmer";

const MyCart = () => {
  const { loading } = useSelector((state) => state.cart);
  // console.log(loading);

  // let loading = true;

  if (loading) {
    return (
      <div className="max-w-7xl px-6 mt-5 mx-auto">
        <h1 className="font-bold text-2xl mb-6">Loading your Cart...</h1>
        <CartShimmer />
      </div>
    );
  }

  return (
    <div className="max-w-5xl px-6 mt-5 mx-auto">
      <h1 className="font-bold text-2xl mb-6">Review your order</h1>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,350px] gap-6">
        <SingleCart />
        <OrderSummary />
      </div>
    </div>
  );
};

export default MyCart;
