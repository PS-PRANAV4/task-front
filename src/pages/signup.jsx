import React, { useState } from "react";
import axios from "axios";
import "../css/login.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showotp,setShowOtp] = useState(false)
  const [response,setResponse] = useState('')
  const [emailStr,SetEmailStr] = useState('')

  const handlerChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setResponse('')
    setForm({ ...form, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(form.email, form.password);
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "account/signup/",
        { user_name: form.username, password: form.password,email:form.email,key:emailStr }
      );

      if (res.status) {
        console.log(res.data);
        
        navigate("/login");
      }
    } catch (err) {
      setResponse(err.response.data.msg);
      console.log(err);
    }
  };

  const verifyEmail = async () => {
    try {
        
        
        const res  = await axios.post( process.env.REACT_APP_API_URL +`account/send-mail-otp/`,{email:form.email})
  
        if(res.status){
            setShowOtp(true)
        }
       
        
    } catch (err) {
  


        setResponse(err.response.data.msg)
        
  
        
    } 
   
   
  };
  const confirmOtp =async () => {
    try {
        console.log(form.otp);
        
        
        const res  = await axios.post( process.env.REACT_APP_API_URL +`account/verify-otp/`,{otp:form.otp,email:form.email})
  
        if(res.status){
            setShowOtp(false)
            SetEmailStr(res.data.string_unique)
        }
       
        
    } catch (err) {
  


        setResponse(err.response.data.msg)
        
  
        
    } 
   
    
  };

  return (
    <div className="login">
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="card p-4" style={{ width: "40%" }}>
          <div className="text-center mb-4">
            <h2>Login</h2>
          </div>
          <div>
            <form onSubmit={submitHandler}>
              <div className="form-group p-3">
                <div style={{ position: "relative" }}>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handlerChange}
                  />
                  <span
                    onClick={verifyEmail}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "blue", // Optional: color for the text
                     
                    }}
                  >
                    Verify
                  </span>
                </div>
              </div>

{showotp?( <div className="form-group p-3">
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    name="otp"
                    className="form-control"
                    id="otp"
                    placeholder="Enter Otp"
                    value={form.otp}
                    onChange={handlerChange}
                  />
                  <span
                    onClick={confirmOtp}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "blue", // Optional: color for the text
                     
                    }}
                  >
                    Confirm
                  </span>
                </div>
              </div>):""}





              <div className="form-group p-3">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  id="username"
                  placeholder="Enter Username"
                  value={form.username}
                  onChange={handlerChange}
                />
              </div>
              <div className="form-group p-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handlerChange}
                />
              </div>
              <div className="form-group p-3">
                <input
                  type="password"
                  name="ConfirmPassword"
                  className="form-control"
                  id="ConfirmPassword"
                  placeholder="Confirm Password"
                  value={form.ConfirmPassword}
                  onChange={handlerChange}
                />
              </div>
              <div className="fs-1 text-white">
                <h4>{error}</h4>
              </div>
              <div className="form-group p-3">
                <button type="submit" className="btn btn-primary btn-block p-3">
                  Login
                </button>
                <div>{response}</div>
              </div>
            </form>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <div style={{cursor:"pointer"}} onClick={()=>{navigate("/otp")}}>Login with Otp</div>
              <div style={{cursor:"pointer"}} onClick={() => { navigate("/login") }}>login</div>
            </div>
          

          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
