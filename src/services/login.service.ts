import bcrypt from 'bcrypt';
import { DuenoData, User, UpdateDuenoDTO, DuenoResponseDTO, mapToDuenoResponseDTO, IDueno } from '../models/Dueno.model';
import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtPayload, UserRole } from '../types/auth';
import { AppError } from '../types/appErrors';



if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET no definido');
}
const secretKey: string = process.env.JWT_SECRET;

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<number> => {
  const hashedPassword = await bcrypt.hash(password, 10);
 const user = await User.create({
  username,
  email,
  password: hashedPassword,
});
return typeof user._id === 'number' ? user._id : Number(user._id);
};


export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const invalidCredentialsError = new Error('Credenciales inválidas');
  const user = await User.findOne({ email });
  
  if (!user) {
    throw new AppError('Credenciales inválidas', 401);//manejo personalizado de errores
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    throw invalidCredentialsError;
  }
  
  const payload: JwtPayload = {
    id: String(user._id),
    userId: String(user._id),
    role: user.role as UserRole,
  };
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || '1h',
    issuer: 'Abel M Garcia',
  };
return jwt.sign(payload, secretKey, options);
  
};