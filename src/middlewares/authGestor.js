import jwt from 'jsonwebtoken';  

const authGestor = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ erro: 'Token inválido.' });
      }
    
      req.user = decoded;  

      if (decoded.tipo !== 'gestor') {
        return res.status(403).json({ erro: 'Acesso negado. Você não tem permissão.' });
      }
      next(); 
    });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao verificar o token.', detalhes: error.message });
  }
};

export default authGestor;