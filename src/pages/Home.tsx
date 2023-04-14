import React from "react";
import { Hero } from "../components/hero/Hero";
import { Land } from "../components/Land/Land";
import { ContactUs } from "../components/contactus/ContactUs";
import { Numbers } from "../components/numbers/Numbers";
import { Products } from "../components/products/Products";
import { YellowDetails } from "../components/yellowDetails/YellowDetails";

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Products />
      <YellowDetails />
      <Land />
      <Numbers />
      <ContactUs />
    </>
  );
};
