import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const users = [
  { email: "john.doe@example.com", password: "Xy7$kLm@29" },
  { email: "alice.smith@email.com", password: "P@ssw0rD!98" },
  { email: "michaelb@example.com", password: "Michael@123" },
  { email: "snehavr2002@gmail.com", password: "Sneha@456" },
  { email: "appu@example.com", password: "Dharshan@789" },
  { email: "kumar@example.com", password: "Kumar@321" }
];

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("loggedInUser", user.email);
      navigate("/medical-details");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
