import { verify } from "crypto";
import mongoose from "mongoose";
import { type } from "os";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true["Please Provide a username"],
    unique: true,
  },

  email: {
    type: String,
    required: true["Please Provide a email"],
    unique: true,
  },

  password: {
    type: String,
    required: true["Please Provide a password"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry:Date,
});


const User = mongoose.models.users || mongoose.model("users", UserSchema);

export default User;
