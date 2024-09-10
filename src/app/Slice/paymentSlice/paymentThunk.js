import http from "../../../utils/axios/axiosIntercepter";

export const stripePaymentIntegration = async ({ cartId }) => {
  try {
    const id = localStorage.getItem("id");
    const response = await http.post(`/users/payment/${id}`, { cartId });
    
    if (response.data.url) {
      window.location.href = response.data.url;
    } else {
      console.log("No URL provided in the response");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
