import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error("No authorization header provided");
    return res
      .status(401)
      .json({ message: "You cannot access this operation without a token!" });
  }

  // Extract the token from the second part
  const accessToken = authHeader;
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

  jwt.verify(accessToken, secretKey, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired." });
      }
      return res.status(401).json({ message: "Invalid token provided!" });
    }

    req.user = decoded;

    next();
  });
};

export default authMiddleware;
