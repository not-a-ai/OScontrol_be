import OrdemServico from '../models/ordem_servicos.js';

export async function criar(req, res) {
    const { descricao, tecnicoId } = req.body;

    const ordem = await OrdemServico.create({
        descricao,
        gestorId: req.user.id,
        tecnicoId,
        status: 'aberta'
    });

    return res.status(201).json(ordem);
}
export async function visualizar(req, res) {
    const ordem = await OrdemServico.findByPk(req.params.id);

    if (!ordem) return res.status(404).json({ message: 'Ordem não encontrada' });

    if (ordem.tecnicoId !== req.user.id && ordem.gestorId !== req.user.id) {
        return res.status(403).json({ message: 'Sem permissão' });
    }

    return res.json(ordem);
}
