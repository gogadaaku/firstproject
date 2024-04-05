import ProductModel from "../models/Product.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
console.log(__dirname);
export const CreateProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    let images = req?.files?.map((item) => {
      return item.filename;
    });
    console.log(images);

    const proData = await ProductModel.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      images: images,
      qty: req.body.qty,
      department: req.body.departmentId,
      active: req.body.active,
    });
    console.log(proData);
    if (proData) res.status(200).send({ message: "product created" });
    else res.status(404).send({ message: "Error creating product" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const GetProducts = async (req, res) => {
  try {
    const proData = await ProductModel.find();
    if (proData) res.status(200).send(proData);
    else res.status(404).send({ error: "product not found" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const GetProductById = async (req, res) => {
  try {
    const proData = await ProductModel.findById(req.query._id);
    if (proData) res.status(200).send(proData);
    else res.status(404).send({ error: "product not found" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const UpdateProductById = async (req, res) => {
  const prodata = await ProductModel.findOne({ _id: req.body._id });
  try {
    // console.log(req.body._id);
    if (req.files == null) {
      const proData = await ProductModel.findByIdAndUpdate(
        { _id: req.body._id },
        {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          qty: req.body.qty,
          department: req.body.departmentId,
          active: req.body.active,
        },
        { new: true }
      );
      if (proData) res.status(200).send({ message: "product updated" });
      else
        res
          .status(404)
          .send({ message: "something went wrong while updating product" });
    } else if (req.files != null) {
      let images = req?.files?.map((item) => {
        return item.filename;
      });
      console.log("images:", images);

      if (images) {
        console.log(prodata);
        // console.log("length:", prodata.images.length);
        // for (let i = 0; i < prodata.images.length; i++) {
        //   console.log("Deleting image:", prodata.images[i]);
        //   const imagePath = path.join(
        //     __dirname,
        //     "../proImages/",
        //     prodata.images[i]
        //   );
        //   console.log("Image path:", imagePath);
        //   try {
        //     fs.unlinkSync(imagePath);
        //     console.log("Image deleted successfully");
        //   } catch (error) {
        //     console.error("Error deleting image:", error);
        //   }
        // }
      }
      const proData = await ProductModel.findByIdAndUpdate(
        { _id: req.body._id },
        {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          qty: req.body.qty,
          department: req.body.departmentId,
          active: req.body.active,
          images: images,
        }
      );
      if (proData) {
        console.log("proData:", proData);
        console.log("length:", prodata.images.length);
        for (let i = 0; i < prodata.images.length; i++) {
          console.log("Deleting image:", prodata.images[i]);
          const imagePath = path.join(
            __dirname,
            "../proImages/",
            prodata.images[i]
          );
          console.log("Image path:", imagePath);
          try {
            fs.unlinkSync(imagePath);
            console.log("Image deleted successfully");
          } catch (error) {
            console.error("Error deleting image:", error);
          }
        }
        res.status(200).send({ message: "product updated" });
      } else
        res
          .status(404)
          .send({ message: "something went wrong while updating product" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// export const UpdateProductById = async (req, res) => {
//   try {
//     console.log(req.body._id);
//     if (req.files == null) {
//       const proData = await ProductModel.findByIdAndUpdate(
//         { _id: req.body._id },
//         {
//           name: req.body.name,
//           description: req.body.description,
//           price: req.body.price,
//           qty: req.body.qty,
//           department: req.body.departmentId,
//           active: req.body.active,
//         },
//         { new: true }
//       );
//       if (proData) res.status(200).send({ message: "product updated" });
//       else
//         res
//           .status(404)
//           .send({ message: "something went wrong while updating product" });
//     } else {
//       let images = req?.file?.map((item) => {
//         return item.filename;
//       });
//       console.log("fafafa:", req.body._id);
//       // const imagePath = path.join(__dirname, "../proImages/", universityData.image);
//       // console.log("Image Path:", imagePath);
//       // fs.unlinkSync(imagePath);
//       const proData = await ProductModel.findByIdAndUpdate(
//         { _id: req.body._id },
//         {
//           name: req.body.name,
//           description: req.body.description,
//           price: req.body.price,
//           qty: req.body.qty,
//           department: req.body.departmentId,
//           active: req.body.active,
//           images: images,
//         }
//       );
//       if (proData) res.status(200).send({ message: "product updated" });
//       else
//         res
//           .status(404)
//           .send({ message: "something went wrong while updating product" });
//     }
//   } catch (e) {
//     res.status(404).send({ error: e?.message });
//   }
// };
export const DeleteProductById = async (req, res) => {
  try {
    const proData = await ProductModel.deleteOne({ _id: req.query._id });
    if (proData.deletedCount == 1)
      res.status(200).send({ message: "Product deleted" });
    else res.status(404).send({ error: "product not deleted" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const GetProductsByDepartmentId = async (req, res) => {
  try {
    const proData = await ProductModel.find({
      department: req.query.departmentId,
    }).populate({
      path: "department",
      populate: {
        path: "university",
      },
    });
    if (proData) res.status(200).send(proData);
    else res.status(404).send({ error: "product not found" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const GetProductDetails = async (req, res) => {
  try {
    const proData = await ProductModel.findById(req.query._id).populate({
      path: "department",
      populate: {
        path: "university",
      },
    });
    if (proData) res.status(200).send({proData});
    else res.status(404).send({ error: "product not found" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const UpdateProductQuantity = async (req, res) => {
  try {
    let proData = await ProductModel.findById(req.body._id);
    let active = true;
    if (proData.qty - req?.body?.qty <= 0) active = false;

    let productData = await ProductModel.findByIdAndUpdate(
      { _id: req.body._id },
      {
        active: active,
        qty: proData.qty - req.body.qty,
      }
    );
    if (productData) res.status(200).send({ message: "product qty updated" });
    else
      res
        .status(404)
        .send({ error: "something went wrong while updating quantity" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
