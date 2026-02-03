import { UserRole } from './auth';

export interface DuenoDTO {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}