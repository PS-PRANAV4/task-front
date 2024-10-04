import React, { useState } from "react";

import axios from "axios";

import "../css/login.css";

import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const [error, setError] = useState("");

  const handlerChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log(form.email, form.password);

      const res = await axios.post(
        process.env.REACT_APP_API_URL + "account/login/",
        { username: form.email, password: form.password }
      );

      if (res.status) {
        console.log(res.data);

        localStorage.setItem("token", res.data.access);
        navigate("/");
      }
    } catch (err) {
      setError("Incorret username or password");
      console.log(err);
      console.log(error);
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
              <div className="form-group p-3">
                {/* <label for="email">Email address</label> */}
                <input
                  type="text"
                  name="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter Username"
                  value={form.email}
                  onChange={handlerChange}
                />
              </div>
              <div class="form-group p-3">
                {/* <label for="password">Password</label> */}
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handlerChange}
                />
              </div>
              <div className="fs-1 text-white ">
                <h4>{error}</h4>
              </div>
              <div className="form-group p-3 ">
                <button type="submit" class="btn btn-primary btn-block p-3">
                  Login
                </button>
              </div>
            </form>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
              <div style={{cursor:"pointer"}} onClick={()=>{navigate("/otp")}} >Login with Otp</div>
              <div style={{cursor:"pointer"}}  onClick={()=>{navigate("/signup")}} >Sign Up</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
