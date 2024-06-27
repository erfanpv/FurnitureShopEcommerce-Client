import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderDetails from "../../../Components/OrderDetails/OrderDetails";


const UserOrders = () => {
  return (
    <div className="sm:ml-64 md:ml-4 lg:ml-64">
      <OrderDetails />
    </div>
  );
};

export default UserOrders;
