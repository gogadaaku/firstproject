import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  role: { type: String, default: "user" },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  profilePic: { type: String },
});

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
