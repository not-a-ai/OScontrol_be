import jwt from "jsonwebtoken";

function authToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ erro: "Token não fornecido." });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ erro: "Token inválido." });

    req.userId = decoded.id;
    req.tipo = decoded.tipo;
    next();
  });
}
export default authToken;
