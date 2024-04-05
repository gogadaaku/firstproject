import UserModel from "../models/User.js";

export const RegisterUser = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      res.status(404).send({ error: "user already exists" });
    } else {
      const userData = await UserModel.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        profilePic: req?.file?.filename,
      });
      if (userData)
        res.status(200).send({ message: "user registered successfully" });
      else res.status(404).send({ error: "user not registered" });
    }
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const userData = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (userData)
      res.status(200).send({ message: "user logged in successfully",userData });
    else res.status(404).send({ error: "user not logged in" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
