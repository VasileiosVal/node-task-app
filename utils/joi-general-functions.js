const Joi = require("joi");

const chooseUserMethod = (method = "register") => {
  switch (method) {
    case "register":
      return {
        name: Joi.string()
          .min(2)
          .max(30)
          .trim()
          .required(),
        email: Joi.string()
          .email({ minDomainAtoms: 2 })
          .required()
          .trim()
          .lowercase(),
        password: Joi.string()
          .min(6)
          .max(15)
          .required()
          .trim()
      };
    case "login":
      return {
        email: Joi.string()
          .email({ minDomainAtoms: 2 })
          .required()
          .trim()
          .lowercase(),
        password: Joi.string()
          .min(6)
          .max(15)
          .required()
          .trim()
      };
  }
};

const options = { stripUnknown: true, abortEarly: false };

const generateJoiError = result => {
  const errors = {};
  for (let i of result.error.details) errors[i.path[0]] = i.message;
  return { error: errors };
};

const getTaskSchema = (method = "post") => {
  switch (method) {
    case "post":
      return {
        name: Joi.string()
          .required()
          .min(3)
          .max(50)
          .trim(),
        description: Joi.string()
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
        ])
      };
    case "patch":
      return {
        name: Joi.string()
          .min(3)
          .max(50)
          .trim(),
        description: Joi.string()
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
        ])
      };
  }
};

module.exports = {
  chooseMethod: chooseUserMethod,
  getTaskSchema,
  options,
  generateJoiError
};
