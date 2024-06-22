import React, { useContext } from "react";
import FurnitureCard from "../ProductCard/Cards.jsx";
import MyContext from "../../../utils/Context.js";
import ProductShimmer from "../../ShimmerUI/ProductShimmer/ProductShimmer.jsx";

const Beds = () => {
  const { filteredItems } = useContext(MyContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-10">
      {!ProductShimmer ? (
        <ProductShimmer />
      ) : (
        filteredItems.map((productItem) => {
          if (productItem.type === "Bed") {
            return <FurnitureCard productItem={productItem} />;
          }
        })
      )}
    </div>
  );
};

export default Beds;
