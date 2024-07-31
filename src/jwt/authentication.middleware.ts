import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private jwt: JwtService,
        private config: ConfigService,
    ) {}

    use(req: Request, res: Response, next: NextFunction) {
        let token = req.headers.authorization;

        if (!token) {
            res.status(401).send({
                status: 401,
                error: 'Unauthorized',
                message: 'No token provided',
            });
        }

        token = token.split(' ')[1];

        try {
            const { role } = this.jwt.verify(token, {
                secret: this.config.get<string>('TOKEN_SECRET'),
            });

            req['role'] = role;
            next();
        } catch {
            res.status(401).send({
                status: 401,
                error: 'Unauthorized',
                message: 'Invalid token',
            });
        }
    }
}
