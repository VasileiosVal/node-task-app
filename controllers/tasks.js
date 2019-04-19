const { Task, validate } = require("../models/task");
const checkNumber = require("../utils/general-functions");
const { generateJoiError } = require("../utils/joi-general-functions");
const genErrorResponse = require("../utils/generateError");

const getTasks = async (req, res) => {
  let { activePage, unitsPerPage } = req.query;

  unitsPerPage =
    checkNumber(unitsPerPage) && checkNumber(unitsPerPage) <= 10
      ? parseInt(unitsPerPage)
      : 10;
  activePage = checkNumber(activePage) ? parseInt(activePage) : 1;

  const tasks = await Task.find({ user: req.user._id })
    .skip((activePage - 1) * unitsPerPage)
    .limit(unitsPerPage)
    .sort("-createdAt")
    .select("-__v -user");

  res.send(tasks);
};

const storeTask = async (req, res) => {
  const result = validate("post", req.body);
  if (result.error) {
    const message = generateJoiError(result);
    return res.status(400).send(message);
  }
  const foundDuplicate = await Task.findOne({
    name: result.value.name,
    user: req.user._id
  });
  if (foundDuplicate) genErrorResponse(400, "A task with the same name exists");

  const task = new Task({ ...result.value, user: req.user._id });
  await task.save();

  const response = {
    _id: task._id,
    name: task.name,
    description: task.description,
    deadline: task.deadline,
    priority: task.priority,
    status: task.status,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt
  };

  res.send(response);
};

const updateTask = async (req, res) => {
  let task = await Task.findById(req.params.id);
  if (!task) genErrorResponse(404, "No task found");

  if (task.user.toString() !== req.user._id.toString())
    genErrorResponse(400, "An error occured");

  const result = validate("patch", req.body);
  if (result.error) {
    const message = generateJoiError(result);
    return res.status(400).send(message);
  }

  if (result.value.name && result.value.name !== task.name) {
    const foundDuplicate = await Task.findOne({
      name: result.value.name,
      user: req.user._id
    });
    if (foundDuplicate)
      genErrorResponse(400, "A task with the same name exists");
  }

  task.set({ ...task, ...result.value });

  await task.save();

  res.send(task);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) genErrorResponse(404, "No task found");

  if (task.user.toString() !== req.user._id.toString())
    genErrorResponse(400, "An error occured");

  await task.remove();
  res.send(task);
};

module.exports = {
  getTasks,
  storeTask,
  updateTask,
  deleteTask
};
