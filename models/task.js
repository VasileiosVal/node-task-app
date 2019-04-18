const mongoose = require("mongoose");
const Joi = require("joi");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    description: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 255
    },
    deadline: {
      type: Date,
      default: Date.now
    },
    priority: {
      type: String,
      enum: ["minor", "normal", "important", "hurry"],
      default: "normal"
    },
    status: {
      type: String,
      enum: [
        "abandonded",
        "not started",
        "just started",
        "working",
        "almost completed",
        "completed"
      ],
      default: "just started"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const validate = arg => {
  const schema = {
    name: Joi.string()
      .required()
      .min(3)
      .max(50)
      .trim(),
    description: Joi.string()
      .min(5)
      .max(255)
      .trim(),
    deadline: Joi.date(),
    priority: Joi.string().valid(["minor", "normal", "important", "hurry"]),
    status: Joi.string().valid([
      "abandonded",
      "not started",
      "just started",
      "working",
      "almost completed",
      "completed"
    ]),
    user: Joi.objectId().required()
  };

  return Joi.validate(arg, schema, { stripUnknown: true, abortEarly: false });
};

module.exports = mongoose.model("Task", taskSchema);
