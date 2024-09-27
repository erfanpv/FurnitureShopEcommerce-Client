import React, { useState } from "react";
import MyContext from "../Context";

const CartProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("overflow-y-hidden");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("overflow-y-hidden");
  };

  return (
    <MyContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default CartProvider;
