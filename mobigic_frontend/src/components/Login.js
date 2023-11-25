import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Login() {
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      let response = await axios.post("http://localhost:4000/login", userData);
      navigate("/upload", { state: { id: response.data.data._id } });
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };
  return (
    <Box sx={{ mt: "10px" }}>
      <TextField
        id="outlined-basic"
        label="Enter UserName"
        variant="outlined"
        type="password"
        onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
      />
      <br />
      <br />
      <TextField
        id="outlined-basic"
        label="Enter Password"
        variant="outlined"
        type="password"
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <br />
      <br />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
      <br />
      <br />
      <Link to={"/"}>
        <Button variant="contained">Go back to register</Button>
      </Link>
    </Box>
  );
}

export default Login;
