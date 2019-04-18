module.exports = () => {
  process.on("uncaughtException", err => {
    console.log("uncaughtException", err.message);
    process.exit(1);
  });
  process.on("unhandledRejection", err => {
    console.log("unhandledRejection", err.message);
    process.exit(1);
  });
};
