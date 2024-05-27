const createdErrorHandler = (err, req, res, next) => {
  if (err.name === "CreatedError") {
    return res.status(201).json({ message: err.message });
  }

  next(err);
};

export default createdErrorHandler;
