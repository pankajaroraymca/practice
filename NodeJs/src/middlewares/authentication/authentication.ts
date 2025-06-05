import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface UserPayload {
  id: number;
  name: string;
  exp: number;
  iat?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload 
}


export const authentication = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {

    const authHeaders = req.headers.authorization

    if (authHeaders && authHeaders.startsWith('Bearer ')) {

        const token = authHeaders.split(' ')[1];
        const secretKey: any = process.env.JWT_SECRET_KEY

        jwt.verify(token, secretKey, (err: any, decoded: any) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }

            req.user = decoded;
            next();
        });

    } else {
        res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

}