import mongoose from 'mongoose';

export interface ILivro {
    titulo: string;
    autor: string;
    ano: number;
}

const livroSchema = new mongoose.Schema<ILivro>({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    ano: { type: Number, required: true }
});

export const Livro = mongoose.model<ILivro>('Livro', livroSchema);
