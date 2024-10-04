import React, { useState } from "react";

import axios from "axios";

import "../css/login.css";

import { useNavigate } from "react-router-dom";

function LoginOtp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const [error, setError] = useState("");
  const [otpStatus,setOtpStatus] = useState(true)

  const handlerChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if(otpStatus)
    {
        console.log('sending otp to maile');
        try {
    

      const res = await axios.post(
        process.env.REACT_APP_API_URL + "account/login-send-otp/",
        { email: form.email }
      );

      if (res.status) {
        console.log(res.data);

        setOtpStatus(false)
        setForm({ ...form, ["otp"]: '' });
        
      }
    } catch (err) {
      setError("Incorret username or password");
      console.log(err);
      console.log(error);
    }
        
    }
    else{

        console.log(form.email,form.otp);
        
        try {
    

            const res = await axios.post(
              process.env.REACT_APP_API_URL + "account/login-otp/",
              { email: form.email,otp:form.otp }
            );
      
            if (res.status) {
              localStorage.setItem("token", res.data.access);
            navigate("/");
              
              
            }
          } catch (err) {
            setError("Incorret username or password");
            console.log(err);
            console.log(error);
          }
        
    }

    
  };

  return (
    <div className="login">
      <div
        class="container "
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div class="card p-4" style={{ width: "40%" }}>
          <div class="text-center mb-4">
            <h2>Login</h2>
          </div>
          <div>
            <form onSubmit={submitHandler}>

                {otpStatus?(<div className="form-group p-3">

<input
  type="text"
  name="email"
  class="form-control"
  id="email"
  placeholder="Enter Username"
  value={form.email}
  onChange={handlerChange}
/>
</div>):<div className="form-group p-3">

<input
  type="text"
  name="otp"
  class="form-control"
  id="otp"
  placeholder="Enter Otp"
  value={form.otp}
  onChange={handlerChange}
/>
</div>}
              
             
              <div className="fs-1 text-white ">
                <h4>{error}</h4>
              </div>
              <div className="form-group p-3 ">
                <button type="submit" class="btn btn-primary btn-block p-3">
                  {otpStatus?"Send otp":"Login"}
                </button>
              </div>
            </form>
            <div  style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
              <div style={{cursor:"pointer"}} onClick={()=>{navigate("/login")}} >Login </div>
              <div style={{cursor:"pointer"}}  onClick={()=>{navigate("/signup")}} >Sign Up</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginOtp;
