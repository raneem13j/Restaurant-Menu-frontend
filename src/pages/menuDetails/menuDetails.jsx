import React, { useState, useEffect, useRef } from "react";
import "./menuDetails.css";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useParams } from "react-router";


function MenuDetails() {
  const columns = [
    { id: "images", label: "Products", minWidth: 100 },
    { id: "product", label: "Category", minWidth: 100 },
    { id: "edit", label: "Price", minWidth: 100 },
    { id: "edit", label: "Edit price", minWidth: 100 },
  ];
  const menuId = useParams();
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [menu, setMenu] = useState([]);
  const [price , setPrice] = useState({
    price: "",
  });
  const form = useRef();

  useEffect(() => {

    // Fetch the QR code image URL from the server
    axios.get(`http://localhost:5000/menu/qr/${menuId.id}`)
      .then((response) => {
        setQrCodeUrl(response.data);
        console.log(qrCodeUrl);
      })
      .catch((error) => {
        console.error('Error fetching QR code:', error);
      });
  }, [menuId.id]);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/menu/${menuId.id}`);
      setMenu(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMenus(); // Initial fetch when component mounts
  }, [menuId.id]); 

  const handlePriceChange = (event) =>{
    const { name, value } = event.target;
    setPrice({ ...price, [name]: value });
  }

  const handleEditPrice = async (event ,id)=>{
    console.log(id);
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/product/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: price.price,
        }),
      });
  
      if (response.ok) {
        setPrice({
          price: "",
        });
        fetchMenus();
        
      } else {
        console.error("Failed to create category");
      }
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <>
    <button> <a  href="/dashboard">back to dashboard</a></button>
      <div className="menuDetails">
        <h1>Menu Details</h1>
        <div className="div-map">
          
            <>
              <h3>{menu.menu}</h3>
              <div>
                <Paper
                  sx={{
                    width: "75%",
                    overflow: "hidden",
                    marginLeft: "auto",
                    marginRight: "auto",
                    border: "#0B486A solid 1px",
                  }}
                >
                  <TableContainer sx={{ maxHeight: "600px" }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {menu.products?.map((product, i) => (
                          <TableRow key={i}>
                            <TableCell>{product.product}</TableCell>
                            <TableCell>{product.categoryId.category}</TableCell>
                            <TableCell>{product.price} $</TableCell>
                            <TableCell>
                              <form  ref={form}  onSubmit={(event) => handleEditPrice(event, product._id)}>
                              <input className="price-input"
                               type="text"
                               placeholder="Price"
                               name="price"
                               value={price.price}
                               onChange={handlePriceChange}
                               />
                              <button type="submit"
                                className="prodash-button"
                                //   onClick={() => getProductById(product._id)}
                              >
                                Edit Price{" "}
                              </button>
                              </form>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </>
            <img src={`data:image/png;base64,${qrCodeUrl}`} alt="QR Code" />
        </div>
      </div>
    </>
  );
}

export default MenuDetails;
