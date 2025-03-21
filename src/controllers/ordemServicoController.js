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
    console.log(req.params.id)
    const ordem = await OrdemServico.findByPk(req.params.id);

    if (!ordem) return res.status(404).json({ message: 'Ordem não encontrada' });

    return res.json(ordem);
}

export const atualizar = async (req, res) => {
  const ordem = req.ordem; 

  const camposPermitidos = ['descricao', 'status', 'data_fechamento', 'valor_final', 'tecnico_id'];
  camposPermitidos.forEach((campo) => {
  if (req.body[campo] !== undefined) {
    ordem[campo] = req.body[campo];
  }
});


  try {
    await ordem.save();
    res.status(200).json({ mensagem: 'Ordem de Serviço atualizada com sucesso.', ordem });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar a Ordem de Serviço.', detalhes: error.message });
  }
};
