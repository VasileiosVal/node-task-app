const mongoose = require("mongoose");
const Joi = require("joi");

const { getTaskSchema, options } = require("../utils/joi-general-functions");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    description: {
      type: String,
      trim: true,
      maxlength: 255,
      default: null
    },
    deadline: {
      type: Date,
      default: null
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

taskSchema.index({ name: 1, user: 1 }, { unique: true });

const validate = (method = "post", arg) => {
  const schema = getTaskSchema(method);

  return Joi.validate(arg, schema, options);
};

module.exports = {
  Task: mongoose.model("Task", taskSchema),
  validate
};
