import React from "react";
import Carousel from "./Carousel/Carousel";
import Promo from "./PromoSection/Promo";
import Catogories from "./CatogorySection/Catogory";
import DiscountOffer from "./OfferAds/DiscountOffer";
import LogoSections from "./LogoSections/LogoSections";

const Home = () => {
  return (
    <div>
      <Carousel />
      {/* <Promo />
      <Catogories />
      <DiscountOffer/> */}
      <LogoSections/>
    </div>
  );
};

export default Home;
