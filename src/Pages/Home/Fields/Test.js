import React from "react";

export default function App() {
  const cart = [
    ["Corn", "Potato", "Radish"],
    ["Tomato", "Graphes", "Mango"],
  ];
  return (
    <div>
      {cart.map((items, index) => {
        return (
          <ol>
            {items.map((subItems, sIndex) => {
              return <li> {subItems} </li>;
            })}
          </ol>
        );
      })}
    </div>
  );
}