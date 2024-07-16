import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../../app/Slice/addCartSlice/addCartSlice";
import ProductShimmer from "../ShimmerUI/ProductShimmer/ProductShimmer";

function AddCartProduct({ productItem }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.users);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      if (productItem && productItem.id) {
        toast.success(
          `${productItem.name} added to cart with quantity: ${quantity}`
        );

        dispatch(addToCartAsync({ ...productItem, quantity }));

        navigate("/products/cart/mycart");
      } else {
        toast.error("Product data is not fully loaded. Please try again.");
      }
    } else {
      toast.error("You have entered an invalid quantity");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
    toast.warning("You must be logged in to add items to the cart");
  };

  if (!productItem) return <ProductShimmer />;

  return (
    <div key={productItem.id} className="p-5">
      <main className="mt-5 pt-4">
        <div className="container mx-auto mt-5">
          <div className="flex flex-wrap lg:flex-nowrap gap-5">
            <div className="w-full lg:w-1/2 mb-4">
              <div className="shadow-lg rounded-lg">
                <img
                  src={productItem.src}
                  className="w-full h-auto sm:h-96 lg:h-auto object-cover rounded-lg"
                  alt="Product"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 mb-4">
              <div className="shadow-lg rounded-lg p-4">
                <div className="p-4">
                  <h1 className="text-3xl font-bold mb-2">
                    {productItem.name}
                  </h1>
                  <h5 className="text-xl line-through">${productItem.price}</h5>
                  <h3 className="text-2xl">
                    <span className="text-gray-600">Offer Price: </span>$
                    {productItem.price}
                  </h3>

                  <strong className="block mt-4 text-lg">Description</strong>
                  <p className="text-gray-700">{productItem.description}</p>

                  <div className="flex flex-col md:flex-row items-center mt-4 gap-3">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value, 10))
                      }
                      min="1"
                      className="w-16 px-2 py-1 border rounded-md"
                    />
                    <button
                      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                      onClick={
                        isLoggedIn ? handleAddToCart : handleLoginRedirect
                      }
                    >
                      Add to cart
                      <i className="fas fa-shopping-cart ml-1"></i>
                    </button>
                    <button className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-600 hover:text-white">
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="shadow-lg rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center">
                    <img
                      src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB484059092_.png"
                      alt="Returns Policy"
                      className="w-12 h-12"
                    />
                    <p>Returns Policy</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png"
                      alt="1 year warranty"
                      className="w-12 h-12"
                    />
                    <p>1 year warranty</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-top-brand._CB617044271_.png"
                      alt="Top Brand"
                      className="w-12 h-12"
                    />
                    <p>Top Brand</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/Secure-payment._CB650126890_.png"
                      alt="Secure transaction"
                      className="w-12 h-12"
                    />
                    <p>Secure transaction</p>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="shadow-lg rounded-lg p-4">
                <div className="flex items-center">
                  <img
                    src="https://img.icons8.com/?size=2x&id=mnqCs95ap07K&format=png"
                    alt="Offer Icon"
                    className="w-8 h-8"
                  />
                  <h5 className="ml-2">Offers</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                  <div className="p-4 shadow-lg rounded-lg">
                    <h6>Bank Offer</h6>
                    <p>Upto ₹1,500.00 discount on SBI Credit Cards</p>
                  </div>
                  <div className="p-4 shadow-lg rounded-lg">
                    <h6>No Cost EMI</h6>
                    <p>
                      Upto ₹3,377.13 EMI interest savings on ICICI Credit Card
                    </p>
                  </div>
                  <div className="p-4 shadow-lg rounded-lg">
                    <h6>Partner Offers</h6>
                    <p>
                      Get GST invoice and save up to 28% on business purchases.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddCartProduct;
