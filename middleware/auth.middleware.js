import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const tokenFromHeader = req.headers.authorization?.split(" ")[1];
  const tokenFromCookies = req.cookies.token;

  const token = tokenFromHeader || tokenFromCookies;
  
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing or invalid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authenticateUser;
