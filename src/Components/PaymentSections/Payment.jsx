import React from "react";
import PaymenCart from "./PaymnetSummary/PaymnetCart";
import PaymentForm from "./PaymnetForm/PaymentForm";


const PaymentSection = () => {
  return (
    <>
      
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <PaymenCart/>
        <div className=" ">
          <PaymentForm/>
        </div>
      </div>
    </>
  );
};

export default PaymentSection;


