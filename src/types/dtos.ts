import { IVeterinario } from '../models/Veterinario.model';
import { UserRole } from './auth';
import { VeterinarioData } from '../models/Veterinario.model';
export interface VeterinarioDTO {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface UpdateVeterinarioDTO extends Partial<Omit<VeterinarioData, 'id'>> {}

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