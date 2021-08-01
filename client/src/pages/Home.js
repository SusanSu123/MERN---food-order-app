import React from "react";
import FoodList from "../components/FoodList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <FoodList />
      <Cart />
    </div>
  );
};

export default Home;
