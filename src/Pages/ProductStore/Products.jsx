import React, { useEffect } from "react";
import FurnitureCard from "../../Components/Products/ProductCard/Cards";
import ProductShimmer from "../../Components/ShimmerUI/ProductShimmer/ProductShimmer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../app/Slice/ProductsSlice/ProductSliceThunk";

const Products = () => {
  const { products } = useSelector((state) => state.productsAll);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-10 mx-5">
        {products?.length === 0 ? (
          <ProductShimmer />
        ) : (
          products?.map((productItem) => {
            return (
              <FurnitureCard productItem={productItem} key={productItem.id} />
            );
          })
        )}
      </div>
    </>
  );
};

export default Products;
