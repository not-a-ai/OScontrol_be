import express from 'express';
import OrdemServico from '../models/ordem_servicos.js';
import { body, validationResult } from 'express-validator';


const router = express.Router();

// Middleware de validação
const ordemServicoValidation = [
    body('descricao').notEmpty().withMessage('Descrição é obrigatória.'),
    body('status').notEmpty().withMessage('Status é obrigatório.')
      .isIn(['aberta', 'em_andamento', 'concluida', 'cancelada'])
      .withMessage('Status inválido. Valores permitidos: aberta, em_andamento, concluida, cancelada.'),
  ];

router.get('/', async (req, res) => {
  try {
    const ordens = await OrdemServico.findAll();
    res.json(ordens);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ordens de serviço.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ordem = await OrdemServico.findByPk(req.params.id);
    if (!ordem) return res.status(404).json({ error: 'Ordem não encontrada.' });
    res.json(ordem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ordem de serviço.' });
  }
});

router.post('/', ordemServicoValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const ordem = await OrdemServico.create(req.body);
      res.status(201).json(ordem);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar ordem de serviço.' });
    }
  });

  router.put('/:id', ordemServicoValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const ordem = await OrdemServico.findByPk(req.params.id);
      if (!ordem) return res.status(404).json({ error: 'Ordem não encontrada.' });
      await ordem.update(req.body);
      res.json(ordem);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar ordem de serviço.' });
    }
  });

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const ordem = await OrdemServico.findByPk(req.params.id);
    if (!ordem) return res.status(404).json({ error: 'Ordem não encontrada.' });
    await ordem.destroy();
    res.json({ message: 'Ordem de serviço removida com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar ordem de serviço.' });
  }
});

export default router;
