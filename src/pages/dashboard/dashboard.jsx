import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './dashboard.css';
import Category from '../../components/category.jsx';
import Product from '../../components/product.jsx';
import Menu from '../../components/menu.jsx';


const Dashboard = () => {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [menus, setMenus] = useState([]);
  const allData = {
    menus: menus,
    categories: categories,
    products: products,
  };

  const fetchMenus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/menu");
      setMenus(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/category");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {

  fetchMenus();
  fetchCategories();
  fetchProducts();
}, []);
  return (
    <>
   <div>
    <Category
      allData={allData}
      fetchCategories={fetchCategories}
    />
    <Product
      allData={allData}
      fetchProducts={fetchProducts}
    />
    <Menu
      allData={allData}
      fetchMenus={fetchMenus}
    />
  </div>
    </>
  )
}

export default Dashboard
