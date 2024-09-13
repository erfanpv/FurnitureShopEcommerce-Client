const handleCheckout = async () => {
  try {
    const response = await api.post('/users/create-checkout-session', {
      cartItems: items.map(item => ({
        name: item._id.name,
        imageSrc: item._id.imageSrc,
        price: item._id.price,
        quantity: item.quantity,
      })),
      email,
      userId
    });

    const stripe = window.Stripe(stripePublicKey);
    const { id } = response.data;
    await stripe.redirectToCheckout({ sessionId: id });

  } catch (error) {
    console.log(error);
  }
};