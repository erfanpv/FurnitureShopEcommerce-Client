import React from "react";
import SingleCart from "./SingleProductCart/SingleCart";
import OrderSummary from "./OrderSummary/OrderSummary";

const MyCart = () => {
  return (
    <div className="max-w-5xl px-6 mt-5  mx-auto">
      <h1 className="font-bold text-2xl mb-6">Review your order</h1>

      <div className="grid grid-cols-1 md:grid-cols-[1fr,350px] gap-3">
        <SingleCart />
        <OrderSummary />
      </div>
    </div>
  );
};

export default MyCart;
