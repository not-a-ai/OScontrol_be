import { where } from "sequelize";
import Cliente from "../models/cliente.js";

export async function criarCliente(req, res) {
  try {
    const { nome, telefone, email, endereco } = req.body;
    const user_id = req.userId;
    const novoCliente = await Cliente.create({
      nome,
      telefone,
      email,
      endereco,
      user_id,
    });
    return res.status(201).json(novoCliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao cadastrar cliente." });
  }
}

export async function listarClientes(req, res) {
  try {
    const user_id = req.userId;
    const clientes = await Cliente.findAll({ where: { user_id: user_id } });
    return res.json(clientes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar clientes." });
  }
}

export async function buscarClientePorId(req, res) {
  try {
    const { id } = req.params;
    const user_id = req.userId;
    const cliente = await Cliente.findOne({
      where: {
        id,
        user_id: user_id,
      },
    });

    if (!cliente) {
      return res.status(404).json({
        error: "Cliente não encontrado ou não pertence a este usuário.",
      });
    }

    return res.json(cliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar cliente." });
  }
}

export async function atualizarCliente(req, res) {
  console.log(req);
  try {
    const { id } = req.params;
    const { nome, telefone, email, endereco } = req.body;
    const user_id = req.userId;

    const cliente = await Cliente.findOne({
      where: {
        id,
        user_id: user_id,
      },
    });

    console.log("cliente ", cliente);

    if (!cliente) {
      return res.status(404).json({
        error: "Cliente não encontrado ou não pertence a este usuário.",
      });
    }

    await cliente.update({ nome, telefone, email, endereco });
    return res.json(cliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar cliente." });
  }
}

export async function deletarCliente(req, res) {
  try {
    const { id } = req.params;
    const user_id = req.userId;

    const cliente = await Cliente.findOne({
      where: {
        id,
        user_id: user_id,
      },
    });

    if (!cliente) {
      return res.status(404).json({
        error: "Cliente não encontrado ou não pertence a este usuário.",
      });
    }

    await cliente.destroy();
    return res.status(200).json({ error: "Cliente deletado com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar cliente." });
  }
}
