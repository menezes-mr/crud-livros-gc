import express from 'express';
import { conectarBancoDeDados } from './config/database';
import livroRoutes from './routes/livroRoutes';

const app = express();
const porta = 3000;

app.use(express.json());
conectarBancoDeDados();
app.use('/livros', livroRoutes);

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
