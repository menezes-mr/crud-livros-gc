import { Router, Request, Response } from 'express';
import { Livro } from '../models/Livro';

const router = Router();

router.post('/criar', async (req: Request, res: Response) => {
    try {
        const novoLivro = new Livro({
            titulo: req.body.titulo,
            autor: req.body.autor,
            ano: req.body.ano
        });

        const livroSalvo = await novoLivro.save();
        res.status(201).json(livroSalvo);
    } catch (erro: any) {
        res.status(500).json({ mensagem: 'erro ao criar o livro', erro: erro.message });
    }
});

router.get('/listar', async (req: Request, res: Response) => {
    try {
        const listaDeLivros = await Livro.find();
        res.status(200).json(listaDeLivros);
    } catch (erro: any) {
        res.status(500).json({ mensagem: 'erro ao buscar os livros', erro: erro.message });
    }
});

router.get('/buscar/:id', async (req: Request, res: Response) => {
    try {
        const livroEncontrado = await Livro.findById(req.params.id);
        
        if (!livroEncontrado) {
            res.status(404).json({ mensagem: 'Livro não foi encontrado!' });
            return;
        }

        res.status(200).json(livroEncontrado);
    } catch (erro: any) {
        res.status(500).json({ mensagem: 'Erro ao tentar achar o livro', erro: erro.message });
    }
});

router.put('/atualizar/:id', async (req: Request, res: Response) => {
    try {
        const idDoLivro = req.params.id;
        const novosDados = req.body;

        const livroAtualizado = await Livro.findByIdAndUpdate(idDoLivro, novosDados, { new: true });

        if (!livroAtualizado) {
            res.status(404).json({ mensagem: 'Livro não foi encontrado!' });
            return;
        }

        res.status(200).json(livroAtualizado);
    } catch (erro: any) {
        res.status(500).json({ mensagem: 'Erro ao atualizar o livro', erro: erro.message });
    }
});

router.delete('/deletar/:id', async (req: Request, res: Response) => {
    try {
        const idDoLivro = req.params.id;

        const livroDeletado = await Livro.findByIdAndDelete(idDoLivro);

        if (!livroDeletado) {
            res.status(404).json({ mensagem: 'Livro não encontrado!' });
            return;
        }

        res.status(200).json({ mensagem: 'O livro foi apagado com sucesso!' });
    } catch (erro: any) {
        res.status(500).json({ mensagem: 'Erro ao deletar o livro', erro: erro.message });
    }
});

export default router;
