


export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (product, { getState }) => {
    try {
      const state = getState();
      const id = localStorage.getItem("id");
      let userCart = [...state.cart.cart];

      const existingProductIndex = userCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        userCart = userCart.map((item, index) => {
          if (index === existingProductIndex) {
            return { ...item, qty: item.qty + product.quantity };
          }
          return item;
        });
      } else {
        userCart.push({ ...product, qty: product.quantity });
      }

      await axios.patch(`http://localhost:5000/users/${id}`, {
        cart: userCart,
      });

      return userCart;
    } catch (error) {
      console.log("Failed to add to cart:", error);
      throw error;
    }
  }
);