import React, { useEffect } from "react";
import FurnitureCard from "../../Components/Products/ProductCard/Cards";
import ProductShimmer from "../../Components/ShimmerUI/ProductShimmer/ProductShimmer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../app/Slice/ProductsSlice/productThunk.js";

const Products = () => {
  const { products, isLoading } = useSelector((state) => state.productsAll);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="mt-10 mx-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {isLoading ? (
          [...Array(6)].map((_, index) => <ProductShimmer key={index} />)
        ) : products?.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        ) : (
          products.map((productItem) => (
            <FurnitureCard productItem={productItem} key={productItem._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
