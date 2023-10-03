import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";

const Menu = ({ allData,fetchMenus })  => {
  const { menus, categories, products } = allData;
 
  const [menu, setMenu] = useState({
    menu: "",
    products: [],
    categories: [],
  });
  const form = useRef();


  const handleMenuChange = (name, value) => {
    setMenu({ ...menu, [name]: value });
  };

  const handleCreateMenu = async (event) => {
    console.log(menu.menu)
    console.log(menu.products)
    console.log(menu.categories)

    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/menu", {
        menu: menu.menu,
        products: menu.products.map((item) => item.value),
        categories: menu.categories.map((item) => item.value),
      });

      if (response.status === 201) {
        setMenu({
          menu: "",
          products: [],
          categories: [],
        });
        fetchMenus()
      } else {
        console.error("Failed to create menu");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="category-table">
        <div className="list-category">
          <h3 className="list1">list of Menus</h3>
           <div className="list3">
          {menus.map((item, i) => (
            <Link  to={`/menuId/${item._id}`}  key={i}>{item.menu}</Link>
          ))}
          </div>
        </div>
        <div className="subcat-form-container">
          <h1>Create Menu</h1>
          <form className="cat-edit-form2" ref={form}  onSubmit={handleCreateMenu}>
            <div className="username">
              <label className="About_username">Menu name:</label> <br />
              <input
                className="subcat-edit-input"
                id="username"
                type="text"
                placeholder="Menu name"
                name="menu"
                value={menu.menu}
                onChange={(e) => handleMenuChange("menu", e.target.value)}
              />
            </div>
            <div>
              <label className="About_username">Categories:</label>
              <Select
                id="category"
                name="categories"
                isMulti
                options={categories.map((category) => ({
                  value: category._id,
                  label: category.category,
                }))}
                value={menu.categories}
                onChange={(selectedOptions) =>
                  handleMenuChange(
                    "categories",
                    selectedOptions ? selectedOptions : []
                  )
                }
              />
            </div>
            <div>
              <label className="About_username">Products:</label>
              <Select
                id="product"
                name="products"
                isMulti
                options={products.map((product) => ({
                  value: product._id,
                  label: product.product,
                }))}
                value={menu.products}
                onChange={(selectedOptions) =>
                  handleMenuChange(
                    "products",
                    selectedOptions ? selectedOptions : []
                  )
                }
              />
            </div>

            <button className="subcat-edit-button" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Menu;
