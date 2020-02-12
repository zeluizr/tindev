import React, { useState } from "react";

import api from "../services/api";

import "./Login.scss";

import { ReactComponent as Logo } from "../assets/logo.svg";

const Login = ({ history }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await api.post("/devs", {
      username
    });

    const { _id } = response.data;

    history.push(`/dev/${_id}`);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <Logo />
        <input
          placeholder="Digite seu usuário do Github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Login;
