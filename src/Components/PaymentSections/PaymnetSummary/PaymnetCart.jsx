import React from "react";
import DeliveryOption from "../PaymnetForm/DeliveryOptions/DeliveryOption";
import UserCartProducts from "../../UserCartProducts/UserCartProducts";


const PaymenCart = () => {
  

  return (
    <div className="px-4 pt-8">
      <p className="text-xl font-medium">Cart Products</p>
      <p className="text-gray-400">
        Check your items. And select a suitable shipping method.
      </p>
      <UserCartProducts/>
      <p className="mt-8 text-lg font-medium">Shipping Methods</p>
      <DeliveryOption />
    </div>
  );
};

export default PaymenCart;
