import nodemon from "nodemon";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import {
  CreateUniversity,
  DeleteUniversityById,
  GetUniversity,
  GetUniversityById,
  UpdateUniversityById,
} from "./controller/University.js";
import {
  CreateDepartment,
  DeleteDepartmentById,
  GetDepartment,
  GetDepartmentByUniId,
  GetDepartmentId,
  UpdateDepartmentById,
} from "./controller/Department.js";
import {
  CreateProduct,
  DeleteProductById,
  GetProductDetails,
  GetProducts,
  GetProductsByDepartmentId,
  UpdateProductById,
  UpdateProductQuantity,
} from "./controller/Product.js";
import { LoginUser, RegisterUser } from "./controller/User.js";

dotenv.config();

const app = new express();
app.use(express.json());
app.use(cors());

//university images
const images = multer.diskStorage({
  destination: "uniImages",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uniImages = multer({
  storage: images,
});

//university API's

app.post("/uni", uniImages.single("image"), CreateUniversity);
app.get("/uni", GetUniversity);
app.get("/univ", GetUniversityById);
app.put("/uni", uniImages.single("image"), UpdateUniversityById);
app.delete("/uni", DeleteUniversityById);

//department images
const depimages = multer.diskStorage({
  destination: "depImages",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const depImages = multer({
  storage: depimages,
});

//department API's
app.post("/dep", depImages.single("image"), CreateDepartment);
app.put("/dep", depImages.single("image"), UpdateDepartmentById);
app.get("/dep", GetDepartment);
app.delete("/dep", DeleteDepartmentById);
app.get("/dep", GetDepartmentId);
app.get("/depuni", GetDepartmentByUniId);

//product images
const productImages = multer.diskStorage({
  destination: "proImages",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const proImages = multer({
  storage: productImages,
});

//Image Access
app.use(express.static("uniImages/"));
app.use(express.static("depImages/"));
app.use(express.static("proImages/"));

//product API's
app.post("/pro", proImages.array("images"), CreateProduct);
app.get("/pro", GetProducts);
app.get("/prod", GetProductDetails);
app.put("/pros", proImages.array("images"), UpdateProductById);
app.delete("/pro", DeleteProductById);
app.get("/prodep", GetProductsByDepartmentId);
app.post("/updQty", UpdateProductQuantity);

//User Images
const userIm = multer.diskStorage({
  destination: "userImages",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const userImages = multer({
  storage: userIm,
});

//User API's
app.post("/user", userImages.single("image"), RegisterUser);
app.get("/user", LoginUser);

mongoose
  .connect(process.env.DB_URL)
  .then((d) => {
    console.log("database connection successful");
    app.listen(process.env.PORT, () => {
      console.log("connected to port:" + process.env.PORT);
    });
  })
  .catch((e) => {
    console.log("error connecting database");
  });
