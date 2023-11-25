const { Mongoose } = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
require("./Database/config");
const Register = require("./Database/Models/RegisterModel");
const Files = require("./Database/Models/FileModel");
const multer = require("multer");
const path = require("path");
app.use(cors());
app.use(express.json());

const generateSixDigitCode = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const sixDigitCode = generateSixDigitCode();
    return cb(null, `${sixDigitCode}_${file.originalname}`);
  },
});

app.post("/register", async (req, resp) => {
  try {
    if (!req.body.userName || !req.body.password) {
      return resp.status(400).send("please provide Valid details");
    }
    const NewUser = new Register({
      userName: req.body.userName,
      password: req.body.password,
    });
    const saveUser = NewUser.save();
    resp.status(200).send({ userData: NewUser });
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/login", async (req, resp) => {
  try {
    const findUser = await Register.findOne({ userName: req.body.userName });
    if (findUser) {
      const matchPassword = req.body.password === findUser.password;
      if (matchPassword) {
        resp.status(200).send({ data: findUser });
      } else {
        resp.status(400).send("invalid password");
      }
    } else {
      resp.status(404).send("user not found");
    }
    //   const saveUser = NewUser.save();
  } catch (error) {
    throw new Error(error);
  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, resp) => {
  try {
    const newFile = new Files({
      id: req.body.id,
      filePath: req.file.originalname,
      filePath: req.file.path,
      code: generateSixDigitCode(),
    });
    const saveFile = newFile.save();
    resp.status(200).send({ fileData: saveFile });
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/getFile/:id", async (req, resp) => {
  try {
    const getUserFiles = await Files.find({ id: req.params.id });
    resp.status(200).send({ filesData: getUserFiles });
  } catch (error) {
    throw new Error(error);
  }
});

app.delete("/delete/:code", async (req, res) => {
  try {
    const deleteItem = await Files.deleteOne({ code: req.params.code });
    res.status(200).send("deleted successfully");
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
