import React, { useState, useEffect } from "react";
import "./App.css";
import InputForm from "./components/InputForm/InputFrom";
import List from "./components/List/List";

function App() {
  const [itemDeleted, setDeleteItem] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);
  const [electronicItems, setElectronicItems] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [personalCareItems, setPersonalCareItems] = useState([]);

  useEffect(() => {
    const items = localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : [];
    const electronicItems = [],
      foodItems = [],
      personalCareItems = [];
    items.forEach((item) => {
      if (item.category === "Electronics") electronicItems.push(item);
      else if (item.category === "Personal Care") personalCareItems.push(item);
      else foodItems.push(item);
    });

    setElectronicItems(electronicItems);
    setFoodItems(foodItems);
    setPersonalCareItems(personalCareItems);
  }, [itemAdded, itemDeleted]);

  const formSubmitHandler = (productId, productName, productCategory) => {
    const newProduct = {
      id: productId,
      name: productName,
      category: productCategory,
    };
    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.push(newProduct);
    localStorage.setItem("items", JSON.stringify(items));
    setItemAdded(!itemAdded);
  };

  const deleteItemHandle = (id) => {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
          items.splice(i, 1);
          break;
        }
      }
    }
    localStorage.setItem("items", JSON.stringify(items));
    setDeleteItem(!itemDeleted);
  };
  return (
    <>
      <InputForm onSubmit={formSubmitHandler}></InputForm>
      <div className="mt-10 ml-10 border border-gray-300 p-5 rounded-lg">
        <List
          listTitle="Electronic Items"
          items={electronicItems}
          onDelete={deleteItemHandle}
        ></List>
        <List
          listTitle="Food Items"
          items={foodItems}
          onDelete={deleteItemHandle}
        ></List>
        <List
          listTitle="Personal Care Items"
          items={personalCareItems}
          onDelete={deleteItemHandle}
        ></List>
      </div>
    </>
  );
}

export default App;
