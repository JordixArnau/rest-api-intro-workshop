const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = Schema(
  {
    _id: String,
    nickName: {
      type: String,
      unique: true,
      trim: true,
    },
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: [true, "The email is mandatory"],
      unique: true,
      trim: true,
      validate: {
        validator: (value) => isEmail[value],
        message: (props) => `This, ${props.value}, is not a valid email!`,
      },
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", UserSchema);

module.exports = {
  User: User,
};
