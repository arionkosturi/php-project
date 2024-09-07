// @ts-nocheck
import React, { useState } from "react";
import Header from "./Header";
import Categories from "./Categories";
import Footer from "./Footer";
import PublicProducts from "./PublicProducts";
import Reklama from "./Reklama";
function Home({ categories }) {
  let [currentPage] = useState("0");
  const [category] = useState();

  return (
    <div className="container mx-auto">
      <Header />
      <Reklama />
      <PublicProducts currentPage={currentPage} />
      <Categories />
      <Footer category={category} />
    </div>
  );
}

export default Home;
