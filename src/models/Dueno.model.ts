import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../types/auth';

export interface IDueno extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole; 
  createdAt: Date;
  updatedAt: Date; 
}

const duenoSchema = new Schema<IDueno>(
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

export interface DuenoData {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateDuenoDTO extends Partial<Omit<DuenoData, 'id'>> {}

export interface DuenoResponseDTO {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export const mapToDuenoResponseDTO = (dueno: IDueno): DuenoResponseDTO => {
  // return {...category.toObject(), id: category._id as string}
  return {
    username: dueno.username,
    email: dueno.email,
    role: dueno.role,
    createdAt: dueno.createdAt,
    updatedAt: dueno.updatedAt,
    id: dueno._id as unknown as string,
  };
};
