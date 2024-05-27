const unAuthorizedErrorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: err.message });
  }

  next(err);
};

export default unAuthorizedErrorHandler;
