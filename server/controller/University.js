import fs from "fs";
import path from "path";
import UniversityModel from "../models/University.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
console.log(__dirname);
export const CreateUniversity = async (req, res) => {
  try {
    const univData = await UniversityModel.create({
      name: req.body.name,
      image: req?.file?.filename,
    });
    if (univData) res.status(200).send({ message: "university created" });
    else res.status(404).send({ error: "university not created" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const GetUniversity = async (req, res) => {
  try {
    const univData = await UniversityModel.find();
    if (univData) res.status(200).send({ univData });
    else res.status(404).send({ error: "university not found" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const GetUniversityById = async (req, res) => {
  try {
    const univData = await UniversityModel.findById(req.query.id);
    if (univData) res.status(200).send(univData);
    else res.status(404).send({ error: "university not found" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const UpdateUniversityById = async (req, res) => {
  try {
    console.log(req.body);
    const univData = await UniversityModel.findByIdAndUpdate(
      { _id: req.body._id },
      {
        name: req.body.name,
        image: req?.file?.filename,
      }
    );
    if (univData) res.status(200).send("university updated");
    else res.status(404).send({ error: "university not updated" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const DeleteUniversityById = async (req, res) => {
  try {
    const universityId = req.query.id;
    console.log(universityId);
    const universityData = await UniversityModel.findByIdAndDelete({
      _id: universityId,
    });
    console.log(universityData);
    if (universityData) {
      const imagePath = path.join(__dirname, "../uniImages/", universityData.image);
      console.log("Image Path:", imagePath);
      fs.unlinkSync(imagePath);
      res.status(200).send("University and associated image deleted");
    } else {
      res.status(404).send({ error: "University not found or not deleted" });
    }
  } catch (e) {
    res.status(500).send({ error: e?.message });
  }
};
