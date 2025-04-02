import OrdemServico from "../models/ordem_servicos.js";
import { Op } from "sequelize";

export async function criar(req, res) {
  try {
    const {
      descricao,
      client_id,
      tecnico_id,
      status,
      data_abertura,
      data_fechamento,
      valor_final,
    } = req.body;
    const gestor_id = req.user?.id;

    if (!descricao || !tecnico_id) {
      return res.status(400).json({
        erro: "Campos obrigatórios estão faltando.",
        detalhes: { descricao, tecnico_id },
      });
    }

    const ordemServico = await OrdemServico.create({
      descricao,
      tecnico_id,
      client_id,
      gestor_id,
      data_abertura,
      status,
      data_fechamento,
      valor_final,
    });

    return res.status(201).json(ordemServico);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: "Erro ao criar a Ordem de Serviço.",
      detalhes: error.message,
    });
  }
}
export async function visualizar(req, res) {
  const ordem = await OrdemServico.findByPk(req.params.id);

  if (!ordem) return res.status(404).json({ message: "Ordem não encontrada" });

  return res.json(ordem);
}
export async function visualizarTodas(req, res) {
  try {
    const userId = req.userId;

    const ordens = await OrdemServico.findAll({
      where: {
        [Op.or]: [{ gestor_id: userId }, { tecnico_id: userId }],
      },
    });

    if (!ordens || ordens.length === 0) {
      return res.status(200).json({
        message: "Nenhuma ordem de serviço encontrada para este usuário",
      });
    }

    return res.status(200).json(ordens);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: "Erro ao listar as ordens de serviço.",
      detalhes: error.message,
    });
  }
}
export const atualizar = async (req, res) => {
  const ordem = req.ordem;

  const camposPermitidos = [
    "descricao",
    "status",
    "data_fechamento",
    "valor_final",
    "tecnico_id",
  ];
  camposPermitidos.forEach((campo) => {
    if (req.body[campo] !== undefined) {
      ordem[campo] = req.body[campo];
    }
  });

  try {
    await ordem.save();
    res
      .status(200)
      .json({ mensagem: "Ordem de Serviço atualizada com sucesso.", ordem });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao atualizar a Ordem de Serviço.",
      detalhes: error.message,
    });
  }
};

export const deletar = async (req, res) => {
  try {
    const ordem = await OrdemServico.findByPk(req.params.id);

    if (!ordem) {
      return res.status(404).json({ erro: "Ordem de Serviço não encontrada." });
    }

    await ordem.destroy();

    return res.status(200).json({
      mensagem: "Ordem de Serviço deletada com sucesso.",
      ordem,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao deletar a Ordem de Serviço.",
      detalhes: error.message,
    });
  }
};
