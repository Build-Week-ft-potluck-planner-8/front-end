import React, { useState } from 'react';
import axios from "axios";

export default function Login(props) {
    const [state, setState] = useState({
        credentials: {
          username: "",
          password: "",
        },
      });
      const handleChange = (e) => {
        setState({
          credentials: { ...state.credentials, [e.target.name]: e.target.value },
        });
      };
    //   console.log(state);
      const login = (e) => {
        e.preventDefault();
        axios
          .post("http://localhost:5000/api/auth/login", state.credentials)
          .then((res) => {
            localStorage.setItem("token", res.data.payload);
            props.history.push("/friends");
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return (
        <div>
        <form onSubmit={login}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={state.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
          </label>
          <button>Login</button>
        </form>
      </div>
    )
}
