import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/auth';
import { AppError } from '../types/appErrors';
import { rolePermissionsMap } from '../config/permissionStore';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  console.log('Token recibido en authenticate:', token);

  if (!token) {
    return next(new AppError('No token provided', 401));
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(err); // delegar a errorHandler (JsonWebTokenError / TokenExpiredError)
    }
    req.user = decoded as JwtPayload;
    next();
  });
};



export const authorize = (requiredPermission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user.role;
    
    // Obtenemos los permisos del rol desde el mapa en memoria
    const permissions = rolePermissionsMap[userRole] || [];

    if (!permissions.includes(requiredPermission)) {
      return next(new AppError('Acceso denegado: Permiso insuficiente', 403));
    }

    next();
  };
};
