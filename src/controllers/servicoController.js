import Servico from "../models/servico.js";
export async function criar(req, res) {
  try {
    const { nome, descricao, precoBase } = req.body;
    const user_id = req.user?.id;

    if (!nome) {
      return res.status(400).json({
        erro: "Campos obrigatórios estão faltando.",
        detalhes: { nome },
      });
    }

    const servico = await Servico.create({
      nome,
      descricao,
      precoBase,
      user_id,
    });

    return res.status(201).json(servico);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: "Erro ao criar o Serviço.",
      detalhes: error.message,
    });
  }
}
export async function visualizar(req, res) {
  const servico = await Servico.findByPk(req.params.id);

  if (!servico)
    return res.status(404).json({ message: "Serviço não encontrada" });

  return res.json(ordem);
}
export async function visualizarTodas(req, res) {
  try {
    const userId = req.userId;

    const servico = await Servico.findAll({
      where: { user_id: userId },
      attributes: ["id", "nome", "descricao", "precoBase"],
    });

    if (!servico || servico.length === 0) {
      return res.status(200).json({
        message: "Nenhum serviço encontrado para este usuário",
      });
    }

    return res.status(200).json(servico);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: "Erro ao listar os serviço.",
      detalhes: error.message,
    });
  }
}
export const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, precoBase } = req.body;
    const user_id = req.userId;

    const servico = await Servico.findOne({
      where: {
        id,
        user_id: user_id,
      },
    });

    if (!servico) {
      return res.status(404).json({
        error: "Serviço não encontrado ou não pertence a este usuário.",
      });
    }

    await servico.update({ nome, descricao, precoBase });
    return res.json(servico);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar serviço." });
  }
};

export const deletar = async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);

    if (!servico) {
      return res.status(404).json({ erro: "Serviço não encontrado." });
    }

    await servico.destroy();

    return res.status(200).json({
      mensagem: "Serviço deletado com sucesso.",
      servico,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao deletar o Serviço.",
      detalhes: error.message,
    });
  }
};
