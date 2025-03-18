import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js'; 
import dotenv from 'dotenv';

dotenv.config();  

async function login(req, res) {
    const { email, senha } = req.body;

    const user = await Usuario.findOne({ where: { email } });
    if (!user || !(await user.validPassword(senha))) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
        { id: user.id, tipo: user.tipo },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    return res.json({
        token,
        user: {
            id: user.id,
            nome: user.nome,
            email: user.email,
            tipo: user.tipo
        }
    });
}

export default login;
