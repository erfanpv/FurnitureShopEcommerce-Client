import React, { useContext, useEffect } from "react";
import FurnitureCard from "../../Components/Products/ProductCard/Cards";
import MyContext from "../../utils/Context";
import axios from "axios";
import ProductShimmer from "../../Components/ShimmerUI/ProductShimmer/ProductShimmer";

const Products = () => {
  const { filteredItems, setFilteredItems } = useContext(MyContext);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-10 mx-5">
        {filteredItems?.length === 0 ? (
          <ProductShimmer />
        ) : (
          filteredItems.map((productItem) => {
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
