import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../types/auth';

export interface IVeterinario extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const veterinarioSchema = new Schema<IVeterinario>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido'],
    },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: Object.values(UserRole), default: 'user' } as any,
  },
  { timestamps: true }
);

export const Veterinario = mongoose.model<IVeterinario>('Veterinario', veterinarioSchema);

export interface VeterinarioData {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface VeterinarioResponseDTO {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export const mapToVeterinarioResponseDTO = (veterinario: IVeterinario): VeterinarioResponseDTO => {
  return {
    username: veterinario.username,
    email: veterinario.email,
    role: veterinario.role,
    createdAt: veterinario.createdAt,
    updatedAt: veterinario.updatedAt,
    id: veterinario._id as unknown as string,
  };
};
