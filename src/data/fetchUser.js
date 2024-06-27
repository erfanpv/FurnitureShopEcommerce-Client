import axios from "axios";
import { useEffect } from "react";

const userFoundData = (id, setUserCart,setUserName) => {
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setUserCart(response.data.cart);
        setUserName(response.data.lastName)
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    };

    fetchUserCart();
  }, [id]);
};

export { userFoundData };
