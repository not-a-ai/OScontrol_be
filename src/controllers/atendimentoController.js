import models from "../models/index.js";

const { Atendimento, OrdemServico, Usuario } = models;

export const criarAtendimento = async (req, res) => {
  const { ordem_id } = req.params;
  const { diagnostico, solucao, observacao } = req.body;
  const userId = req.userId;

  console.log(req.userId);

  try {
    const ordem = await OrdemServico.findByPk(ordem_id);

    if (!ordem) {
      return res.status(404).json({ erro: "Ordem de serviço não encontrada." });
    }

    if (ordem.tecnico_id !== userId) {
      return res.status(403).json({
        erro: "Você não tem permissão para registrar atendimento nesta ordem.",
      });
    }

    const atendimento = await Atendimento.create({
      ordem_id,
      tecnico_id: userId,
      diagnostico,
      solucao,
      observacao,
    });

    res.status(201).json(atendimento);
  } catch (error) {
    console.error("Erro ao criar atendimento:", error);
    res.status(500).json({ erro: "Erro ao criar atendimento." });
  }
};

export const listarAtendimentosPorOrdem = async (req, res) => {
  const { ordem_id } = req.params;
  const userId = req.userId;
  const tipo = req.tipo;

  try {
    const ordem = await OrdemServico.findByPk(ordem_id);

    if (!ordem) {
      return res.status(404).json({ erro: "Ordem de serviço não encontrada." });
    }

    const isAutorizado =
      (tipo === "tecnico" && ordem.tecnico_id === userId) ||
      (tipo === "gestor" && ordem.gestor_id === userId);

    if (!isAutorizado) {
      return res
        .status(403)
        .json({ erro: "Você não tem permissão para visualizar esta ordem." });
    }

    const atendimentos = await Atendimento.findAll({
      where: { ordem_id },
      include: [
        { model: Usuario, as: "tecnico", attributes: ["nome", "email"] },
      ],
      order: [["data", "ASC"]],
    });

    res.status(200).json(atendimentos);
  } catch (error) {
    console.error("Erro ao listar atendimentos:", error);
    res.status(500).json({ erro: "Erro ao buscar atendimentos." });
  }
};

export const listarTodosAtendimentos = async (req, res) => {
  const { tipo } = req.tipo;

  if (tipo !== "gestor") {
    return res.status(403).json({
      erro: "Apenas gestores podem visualizar todos os atendimentos.",
    });
  }

  try {
    const atendimentos = await Atendimento.findAll({
      include: [
        { model: Usuario, as: "tecnico" },
        { model: OrdemServico, as: "ordem" },
      ],
      order: [["data", "DESC"]],
    });

    res.status(200).json(atendimentos);
  } catch (error) {
    console.error("Erro ao buscar todos os atendimentos:", error);
    res.status(500).json({ erro: "Erro ao buscar atendimentos." });
  }
};

export const deletarAtendimento = async (req, res) => {
  const { atendimento_id: id } = req.params;
  const userId = req.userId;
  const tipo = req.tipo;
  try {
    const atendimento = await Atendimento.findByPk(id);

    if (!atendimento) {
      return res.status(404).json({ mensagem: "Atendimento não encontrado." });
    }

    if (tipo !== "tecnico" || atendimento.tecnico_id !== userId) {
      return res.status(403).json({
        mensagem: "Você não tem permissão para deletar este atendimento.",
      });
    }

    await atendimento.destroy();

    return res
      .status(200)
      .json({ mensagem: "Atendimento deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar atendimento:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};
