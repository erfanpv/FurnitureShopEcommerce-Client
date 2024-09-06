import React, { useEffect } from "react";
import FurnitureCard from "../../Components/Products/ProductCard/Cards";
import ProductShimmer from "../../Components/ShimmerUI/ProductShimmer/ProductShimmer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../app/Slice/ProductsSlice/productThunk.js";

const Products = () => {
  const { products, isLoading} = useSelector((state) => state.productsAll);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-10 mx-5">
        {products?.length === 0 || isLoading === true 
          ? [...Array(6)].map((_, index) => <ProductShimmer key={index} />)
          : products?.map((productItem) => {
              return (
                <FurnitureCard
                  productItem={productItem}
                  key={productItem._id}
                />
              );
            })}
      </div>
    </>
  );
};

export default Products;
