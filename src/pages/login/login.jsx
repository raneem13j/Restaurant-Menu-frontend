import "./login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";



function Login() {
    // the login forms functionalty
  const [isSignup, setIsSignup] = useState(false);

  const handleButtonClick = () => {
    setIsSignup(!isSignup);
  };

  const containerStyle = {
    background: isSignup
      ? "linear-gradient(to bottom, rgb(56, 189, 149), rgb(28, 139, 106))"
      : "linear-gradient(to bottom, rgb(6, 108, 224), rgb(14, 48, 122))",
  };
  
  // the sign up function

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignup = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      Cookies.set("token", data.token);
    Cookies.set("Id", data.user);
    Cookies.set("role", data.role);
      

      alert("You have registered successfully, we will send you an email for acceptance");

     //// the email part where we add email js and the structure of the email
      





     ///////
      window.location.href = "/home";
     
      console.log("Registration successful");
    } catch (error) {
      setError(error.message);
      console.error(error);
       // Show error alert
       alert("Registration failed");
    }
  };

  //   login function

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      // console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
      }
      Cookies.set("token", data.token);
    Cookies.set("Id", data.user);
    Cookies.set("role", data.role);
      
      alert("You have loged in successfully");

       if (data.role === "admin") {
        navigate("/dashboard");
      }else{
        navigate("/home");
      }
    
      console.log("Login successful");
    } catch (error) {
      setError(error.message);
      console.error(error);
       // Show error alert
      alert("Log in failed");
    }
  };

  

  return (
    <div className="container" style={containerStyle}>
      <div className="box-1">
        <div className="content-holder">
          <h2>Hello!</h2>
          <button className="button-1" onClick={handleButtonClick}>
            {isSignup ? "Login" : "Sign up"}
          </button>
        </div>
      </div>

      <div className="box-2">
        <form onSubmit={handleLogin} 
          className="login-form-container"
          style={{ display: isSignup ? "none" : "block" }}
        >
          <h1>Login Form</h1>
          <input type="text" placeholder="Email" className="input-field" 
               autoComplete="off"
               name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)} />
          <br />
          <input type="password" placeholder="Password" className="input-field" 
                autoComplete="off"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}/>
          <br />
          {error && (
                      <p className="error-message"> Invalid Credentials</p>
                    )}
          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        <form onSubmit={handleSignup} 
          className="signup-form-container"
          style={{ display: isSignup ? "block" : "none" }}
        >
          <h1>Sign Up Form</h1>
          <input type="text" placeholder="Username" className="input-field"
               autoComplete="off"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
          <br />
          <input type="email" placeholder="Email" className="input-field" 
                autoComplete="off"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
          <br />
          <input type="password" placeholder="Password" className="input-field"  
                autoComplete="off"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
          <br />
          {error && <p className="error-message"> {error}</p>}

          <button className="signup-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

