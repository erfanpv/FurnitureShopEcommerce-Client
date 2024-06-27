import React from "react";

const CartModal = ({ isVisible, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-[36rem] flex justify-center">{children}</div>
    </div>
  );
};

export default CartModal;