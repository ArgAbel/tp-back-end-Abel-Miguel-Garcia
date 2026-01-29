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

duenoSchema.index({ email: 1 });
duenoSchema.index({ username: 1 });export const User = mongoose.model<IDueno>('User', duenoSchema);

export interface DuenoData {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export const findDueno = async (
  email: string = '',
  username: string = ''
): Promise<DuenoData | null> => {
  const dueno = await User.findOne({ $or: [{ email }, { username }] }).lean();
  if (!dueno) return null;

  return {
    id: dueno._id.toString(),
    username: dueno.username, email: dueno.email,
    password: dueno.password,
    role: dueno.role as UserRole,
  };
};

export const createDueno = async (
  dueno: Omit<DuenoData, 'id' | 'role'>
): Promise<string> => {
  const newDueno = new User({
    username: dueno.username,
    email: dueno.email,
    password: dueno.password,
    role: 'user',
  });
  const saved = await newDueno.save();
  return saved._id.toString();
};