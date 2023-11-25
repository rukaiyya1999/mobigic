import React, { useEffect, useState } from "react";
import { Button, Input, Box } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
function UploadFile() {
  const [file, setFile] = useState();
  const [fileData, setFileData] = useState([]);
  const location = useLocation();
  const { state } = location;
  const { id } = state || {};

  useEffect(() => {
    getAllFiles();
  }, []);

  const getAllFiles = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getFile/${id}`);
      setFileData(response.data.filesData);
      console.log(response.data.filesData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async () => {
   try{
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    const response = await axios.post("http://localhost:4000/upload", formData);
    getAllFiles();
   }catch(error){
    console.log(error);
   }
  };

  const handleDelete = async (code) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/delete/${code}`
      );
      alert("file deleted successFully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Box>
        <Input
          type="file"
          placeholder="choose file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <br />
        <Button variant="contained" onClick={handleFileChange}>
          Upload
        </Button>
      </Box>
      <table
        style={{ borderCollapse: "collapse", width: "100%", marginTop: "50px" }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              ID
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              File Path
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Code
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        {fileData.map((item) => (
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              {item.id}
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              {item.filePath}
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              {item.code}
            </td>

            <td
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              <Button onClick={() => handleDelete(item.code)}>DELETE</Button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default UploadFile;
