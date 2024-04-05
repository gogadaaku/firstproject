import DepartmentModel from "../models/Department.js";

export const CreateDepartment = async (req, res) => {
  try {
    const depData = await DepartmentModel.create({
      name: req.body.name,
      image: req?.file?.filename,
      university: req.body.universityId,
    });
    if (depData) res.status(200).send({ message: "department created" });
    else res.status(404).send({ message: "Error creating department" });
  } catch (e) {
    res.status(404).send({ message: "Error creating department" });
  }
};

export const GetDepartment = async (req, res) => {
  try {
    const depData = await DepartmentModel.find().populate({path:"university"});
    if (depData) res.status(200).send({ message: depData });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const UpdateDepartmentById = async (req, res) => {
  try {
    console.log(req);
    const depData = await DepartmentModel.findByIdAndUpdate(
      { _id: req.body._id },
      {
        name: req.body.name,
        image: req?.file?.filename,
      }
    );
    if (depData) res.status(200).send({ message: "department updated" });
    else res.status(404).send({ message: "Error updating department" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const DeleteDepartmentById = async (req, res) => {
  try {
    const depData = await DepartmentModel.findByIdAndDelete({
      _id: req.query.id,
    });
    if (depData) res.status(200).send({ message: "department deleted" });
    else res.status(404).send({ message: "Error deleting department" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const GetDepartmentId = async (req, res) => {
    try {
      const depData = await DepartmentModel.findOne({
        _id: req.query._id,
      });
      if (depData) res.status(200).send({ message: depData });
    } catch (e) {
      res.status(404).send({ error: e?.message });
    }
  };

  export const GetDepartmentByUniId= async (req, res) => {
    try {
      const depData = await DepartmentModel.find({
        university: req.query.uniId,
      }).populate({path:"university"});
      if (depData) res.status(200).send({ message: depData });
    } catch (e) {
      res.status(404).send({ error: e?.message });
    }
  }