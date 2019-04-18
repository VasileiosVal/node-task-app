const Joi = require("joi");

module.exports = (method = "register") => {
  switch (method) {
    case "register":
      return {
        name: Joi.string()
          .min(2)
          .max(30)
          .trim()
          .required(),
        email: Joi.string()
          .email()
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
          .email()
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
