import React, { useState, useRef } from "react";
import axios from "axios";




const Product = ({ allData,fetchProducts })  => {
  const { menus, categories, products } = allData;
const [product, setProduct] = useState({
    product: "",
    price: "",
    categoryId: ""
  });
  const form = useRef();

  const handleProductChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/product", {
        product: product.product,
        price: product.price,
        categoryId: product.categoryId,
      });

      if (response.status === 201) {
        
        setProduct({
          product: "",
          price: "",
          categoryId: "",
        });

        fetchProducts()
      } else {
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

    



  return (
    <>
      <div className="category-table">
        <div className="list-category" >
           <h3 className="list1">list of Products</h3>
        
                  {products.map((item, i) => (
                    <div className="list2">
                   <p key={i}>{item.product}</p>
                   <p> Price: {item.price} $</p>
                   </div>
                  ))}
               
        </div>
        <div className="subcat-form-container">
          <h1>Creat Product</h1>
          <form
            className="cat-edit-form2"
            onSubmit={handleCreateProduct}
            ref={form}
          >
            <div className="username">
                
              <label className="About_username">Product name:</label> <br />
              <input
                className="subcat-edit-input"
                type="text"
                id="username"
                placeholder="Product name"
                name="product"
                value={product.product}
                onChange={handleProductChange}
              />
              </div>
              <div>
              <label className="About_username">Category name:</label>
              <select
                  id="category"
                  name="categoryId"
                  value={product.categoryId}
                  onChange={handleProductChange}
                >
                  <option value="">Select a category...</option>
                  {categories.map((category,i) => (
    
                    <option key={i} value={category._id}>
                      {category.category}
                    </option>
                    
                  ))}
                     
                </select>
            </div>
               <div className="username">
               <label className="About_username">Product Price:</label> <br />
              <input
                className="subcat-edit-input"
                type="text"
                id="username"
                placeholder="Price"
                name="price"
                value={product.price}
                onChange={handleProductChange}
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

export default Product;




