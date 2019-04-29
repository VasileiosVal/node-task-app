const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.TASKMANAGER_SENDGRID_API_KEY);

const { User, validate } = require("../models/user");
const genErrorResponse = require("../utils/generateError");
const { generateJoiError } = require("../utils/joi-general-functions");

const registerUser = async (req, res) => {
  const result = validate("register", req.body);
  if (result.error) {
    const message = generateJoiError(result);
    return res.status(400).send(message);
  }

  const found = await User.findOne({ email: result.value.email });
  if (found) genErrorResponse(400, "Email already exists");

  const user = new User({ ...result.value });
  user.generateVerify();
  await user.hashPassword();
  await user.save();

  const msg = {
    to: `${user.email}`,
    from: "noreply@taskManager.com",
    subject: "Account verification",
    html: `<div><h2>Hello ${user.name}</h2>
    <p>Follow the link to activate your account: <a href="${
      process.env.TASKMANAGER_URL
    }/api/auth/verify/${user.confirmation}">Click Here</a></p></div>`
  };

  sgMail.send(msg);
  res.send({
    message: "User succesfully registered. An Email verification sent"
  });
};

const loginUser = async (req, res) => {
  const result = validate("login", req.body);
  if (result.error) {
    const message = generateJoiError(result);
    return res.status(400).send(message);
  }

  const user = await User.findOne({ email: result.value.email });
  if (!user) genErrorResponse(400, "Invalid Email or Password");
  const match = await user.verifyPassword(result.value.password);
  if (!match) genErrorResponse(400, "Invalid Email or Password");
  user.checkActivity();
  const token = user.getJWTtoken();
  res.send({ token, user: user.getUserResponse() });
};

const verifyUser = async (req, res) => {
  if (!req.params.hash) genErrorResponse(404, "Service not found");
  const user = await User.findOneAndUpdate(
    { confirmation: req.params.hash },
    {
      isActive: true,
      confirmed: new Date(),
      confirmation: null
    },
    {
      new: true
    }
  );
  if (!user) genErrorResponse(404, "Service not found");
  res.send({ message: "Account succesfully activated" });
};

module.exports = {
  registerUser,
  loginUser,
  verifyUser
};
