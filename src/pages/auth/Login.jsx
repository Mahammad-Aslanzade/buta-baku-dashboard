import React, { useState } from "react";
import { auth } from "../../utils/auth";
import Swal from "sweetalert2";
import { setCookie } from "../../utils/cookie";

const Login = () => {

  const date = new Date();
  const [username , setUserName] = useState();
  const [password , setPassword] = useState();

  const handleSubmit=(e)=>{
    e.preventDefault();

      auth(username , password)
      .then((res)=>{
        setCookie('token', res.data.accessToken);
        setCookie('loginTime' , date.getTime())
        setCookie('role' , res.data.role);

        Swal.fire({
          icon: "success",
          text: "You have successfully logged !!!",
        })
        .then((result) => {
          if (result.isConfirmed){
            window.location.reload();
          }
        })
      })
      .catch((err)=>{
        const message = err.response.data;
        Swal.fire(JSON.stringify(message));
      })
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        
        <h3>Dashboard</h3>
        
        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" onChange={(e)=> setUserName(e.target.value)}/>

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" onChange={(e)=> setPassword(e.target.value)}/>

        <button>Log In</button>
        
      </form>
    </div>
  );
};

export default Login;
