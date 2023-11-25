import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      let response = await axios.post(
        "http://localhost:4000/register",
        userData
      );
      navigate("/upload", { state: { id: response.data.userData._id } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ mt: "10px" }}>
      <TextField
        id="outlined-basic"
        label="Enter UserName"
        variant="outlined"
        type="string"
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
      <Button variant="contained" onClick={handleRegister}>
        Register
      </Button>
      <br />
      <br />
      <Link to={"login"}>
        <Button variant="contained">Go To Login</Button>
      </Link>
    </Box>
  );
}

export default Register;
