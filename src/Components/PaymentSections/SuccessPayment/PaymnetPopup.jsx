import React from "react";
import { Link } from "react-router-dom";

const PaymentPopup = () => {
  return (
    <section className="rounded-3xl shadow-2xl">
      <div className="p-8 text-center sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
          Payment Succefull
        </p>

        <h2 className="mt-6 text-3xl font-bold">
          Thanks for your purchase, we're getting it ready!
        </h2>

        <Link
          className="mt-8 inline-block w-full rounded-full bg-pink-600 py-4 text-sm font-bold text-white shadow-xl"
          to="/products"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default PaymentPopup;
