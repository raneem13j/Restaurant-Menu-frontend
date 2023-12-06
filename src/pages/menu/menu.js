import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router";

function Menu() {
    const menuId = useParams();
    const [menu, setMenu] = useState([]);
    const fetchMenus = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/menu/${menuId.id}`);
          setMenu(response.data);
          console.log(response.data)
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchMenus(); // Initial fetch when component mounts
      }, []); 


   


      return (
        <div>
          {menu.categories &&
            menu.categories?.map((categoryId) => (
              <div key={categoryId}>
                <h3>{categoryId.category}</h3>
                <ul>
                  {menu.products &&
                    menu.products
                      .filter((product) => product.categoryId._id === categoryId._id)
                      .map((product) => (
                        <li key={product._id}>{product.product}</li>
                      ))}
                </ul>
              </div>
            ))}
        </div>
      );
    }
    
    export default Menu;
