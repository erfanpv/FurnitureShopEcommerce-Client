import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FurnitureCard from "../ProductCard/Cards";
import ProductShimmer from "../../ShimmerUI/ProductShimmer/ProductShimmer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsWithCategory } from "../../../app/Slice/ProductsSlice/productThunk";

const CategoryCard = () => {
  const { category } = useParams();
  const { productWithCategory, isLoading } = useSelector((state) => state.productsAll);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchProductsWithCategory({ category }));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [category, dispatch]); 

  return (
    <div className="mt-10 mx-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {isLoading ? (
          [...Array(6)].map((_, index) => <ProductShimmer key={index} />)
        ) : productWithCategory.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No products found in this category.
          </div>
        ) : (
          productWithCategory.map((productItem) => (
            <FurnitureCard key={productItem._id} productItem={productItem} />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
