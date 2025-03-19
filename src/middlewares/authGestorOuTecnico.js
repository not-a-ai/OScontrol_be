import OrdemServico from '../models/ordem_servicos.js';

export const authEditarOS = async (req, res, next) => {
  const { id: osId } = req.params;
  const { id: userId, tipo } = req;

  try {
    const ordem = await OrdemServico.findByPk(osId);

    if (!ordem) {
      return res.status(404).json({ erro: 'Ordem de Serviço não encontrada.' });
    }

    const isGestor = tipo === 'gestor' && ordem.dataValues.gestor_id === req.userId;
    const isTecnico = tipo === 'tecnico' && ordem.dataValues.tecnico_id === req.userId;



    if (!isGestor && !isTecnico) {
      return res.status(403).json({ erro: 'Você não tem permissão para atualizar esta Ordem de Serviço.' });
    }

    req.ordem = ordem;

    next();
  } catch (error) {
    res.status(500).json({ erro: 'Erro na verificação de permissão.', detalhes: error.message });
  }
};

export default authEditarOS;
