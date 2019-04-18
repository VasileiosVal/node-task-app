const mongoose = require("mongoose");
const validator = require("validator");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const chooseMethod = require("../utils/joi-schemas");
const genErrorResponse = require("../utils/generateError");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(val) {
        if (!validator.isEmail(val))
          genErrorResponse(400, `${val} is not a valid Email`);
      }
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    confirmed: {
      type: Date,
      default: null
    },
    confirmation: {
      type: String,
      default: null,
      minlength: 5,
      maxlength: 60
    }
  },
  { timestamps: true }
);

userSchema.methods.hashPassword = async function() {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
};

userSchema.methods.verifyPassword = async function(pass) {
  return await bcrypt.compare(pass, this.password);
};

userSchema.methods.getJWTtoken = function() {
  return jwt.decode(
    jwt.sign(
      { _id: this._id, email: this.email, role: this.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    )
  );
};

userSchema.methods.generateVerify = function() {
  this.confirmation =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);
};

const validate = (method = "register", arg) => {
  const schema = chooseMethod(method);
  return Joi.validate(arg, schema, { stripUnknown: true, abortEarly: false });
};

module.exports = {
  User: mongoose.model("User", userSchema),
  validate
};
