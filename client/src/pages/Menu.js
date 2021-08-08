import React from "react";
import FoodList from "../components/FoodList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Menu = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <FoodList />
      <Cart />
    </div>
  );
};

export default Menu;
