import express from "express";
import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";
import authToken from "../middlewares/authToken.js";
import authGestor from "../middlewares/authGestor.js";

const usuarioRoutes = express.Router();

usuarioRoutes.post("/", async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  if (!nome || !email || !senha || !tipo) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res
        .status(400)
        .json({ erro: "Já existe um usuário com esse e-mail." });
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    const usuarioCriado = await Usuario.create({
      nome,
      email,
      senha_hash,
      tipo,
    });

    return res.status(201).json(usuarioCriado);
  } catch (err) {
    return res
      .status(500)
      .json({ erro: "Erro ao criar o usuário.", detalhes: err.message });
  }
});

usuarioRoutes.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    return res.status(200).json(usuarios);
  } catch (err) {
    return res
      .status(500)
      .json({ erro: "Erro ao buscar usuários.", detalhes: err.message });
  }
});

usuarioRoutes.get("/tecnicos", authToken, authGestor, async (req, res) => {
  try {
    const tecnicos = await Usuario.findAll({ where: { tipo: "tecnico" } });
    return res.status(200).json(tecnicos);
  } catch (e) {
    return res
      .status(500)
      .json({ erro: "Erro ao buscar usuários.", detalhes: e.message });
  }
});

usuarioRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    await usuario.destroy();

    return res.status(200).json({ mensagem: "Usuário excluído com sucesso." });
  } catch (err) {
    return res
      .status(500)
      .json({ erro: "Erro ao excluir o usuário.", detalhes: err.message });
  }
});

usuarioRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;

    if (senha) {
      const senha_hash = await bcrypt.hash(senha, 10);
      usuario.senha_hash = senha_hash;
    }

    await usuario.save();

    return res.status(200).json(usuario);
  } catch (err) {
    return res
      .status(500)
      .json({ erro: "Erro ao atualizar o usuário.", detalhes: err.message });
  }
});

export default usuarioRoutes;
