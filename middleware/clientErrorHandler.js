const clientErrorHandler = (err, req, res, next) => {
  if (err.name === "ClientError") {
    return res.status(400).json({ message: err.message });
  }

  next(err);
};

export default clientErrorHandler;
