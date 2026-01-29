import mongoose, { Schema, Document } from 'mongoose';

export interface IAnimal extends Document {
  name: string;
  description?: string; // ? Campo opcional
  edad: number;
  dueño: string;
  tipoAnimal: string;
  createdAt?: Date;
  updatedAt?: Date;
}
const animalSchema = new Schema<IAnimal>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: false, trim: true },
    edad: { type: Number },
    dueño: { type: String, required: true },
    tipoAnimal: {type: String, required: true }
  },
  { timestamps: true },
);

animalSchema.index({ name: 1 });
animalSchema.index({ tipoAnimal: 1 });

export const animal = mongoose.model<IAnimal>('Animal', animalSchema);