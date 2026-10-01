import mongoose from 'mongoose';

export const conectarBancoDeDados = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/livraria_iniciante');
        console.log('Conectado ao MongoDB com sucesso!');
    } catch (erro) {
        console.log('deu um erro ao conectar no banco:', erro);
    }
};
