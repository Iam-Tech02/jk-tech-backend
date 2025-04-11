import { Role } from '../../roles/entities/role.entity';

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  role?: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface OAuthUser {
  id: number;
  email: string;
  name: string;
  isVerified: boolean;
  role: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
} 