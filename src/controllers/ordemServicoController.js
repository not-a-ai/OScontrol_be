import OrdemServico from '../models/ordem_servicos.js';

export async function criar(req, res) {
  try {
    const { descricao, client_id, gestor_id, tecnico_id, status, data_abertura } = req.body;
    const gestorId = req.user?.id;

    if (!descricao || !tecnico_id || !client_id ) {
      return res.status(400).json({
        erro: 'Campos obrigatórios estão faltando.',
        detalhes: { descricao, tecnico_id, client_id }
      });
    }

    const ordemServico = await OrdemServico.create({
      descricao,
      tecnico_id,
      client_id,
      gestorId,
      data_abertura,
      gestor_id,
      status
    });

    return res.status(201).json(ordemServico);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao criar a Ordem de Serviço.', detalhes: error.message });
  }
      
    
}
export async function visualizar(req, res) {
    const ordem = await OrdemServico.findByPk(req.params.id);

    if (!ordem) return res.status(404).json({ message: 'Ordem não encontrada' });

    if (ordem.tecnicoId !== req.user.id && ordem.gestorId !== req.user.id) {
        return res.status(403).json({ message: 'Sem permissão' });
    }

    return res.json(ordem);
}
