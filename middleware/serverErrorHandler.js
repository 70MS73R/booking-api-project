// serverErrorHandler.js
const serverErrorHandler = (err, req, res, next) => {
  if (err.name === "ServerError") {
    return res.status(500).json({ message: err.message });
  }

  next(err);
};

export default serverErrorHandler;
