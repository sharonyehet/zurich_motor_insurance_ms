import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { mock } from 'jest-mock-extended';
import { Role } from '../constants/constants';
import { AuthMiddleware } from './authentication.middleware';

describe('AuthMiddleware', () => {
    let middleware: AuthMiddleware;
    let jwtService: JwtService;
    let configService: ConfigService;

    beforeEach(async () => {
        jwtService = mock<JwtService>();
        configService = mock<ConfigService>();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthMiddleware,
                {
                    provide: JwtService,
                    useValue: jwtService,
                },
                {
                    provide: ConfigService,
                    useValue: configService,
                },
            ],
        }).compile();

        middleware = module.get<AuthMiddleware>(AuthMiddleware);
    });

    it('should be defined', () => {
        expect(middleware).toBeDefined();
    });

    it('should return 401 if no token is provided', () => {
        const req = mock<Request>();
        const res = mock<Response>();
        const next = jest.fn();
        req.headers.authorization = undefined;
        res.status.mockReturnThis();

        middleware.use(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({
            status: 401,
            error: 'Unauthorized',
            message: 'No token provided',
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', () => {
        const req = mock<Request>();
        const res = mock<Response>();
        const next = jest.fn();
        req.headers.authorization = 'Bearer invalid_token';
        res.status.mockReturnThis();

        jwtService.verify = jest.fn().mockImplementation(() => {
            throw new Error('Invalid token');
        });

        middleware.use(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({
            status: 401,
            error: 'Unauthorized',
            message: 'Invalid token',
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next if a valid token is provided', () => {
        const req = mock<Request>();
        const res = mock<Response>();
        const next = jest.fn();
        const token = 'Bearer valid_token';
        const decodedToken = { role: Role.Admin };

        req.headers.authorization = token;
        jwtService.verify = jest.fn().mockReturnValue(decodedToken);
        configService.get = jest.fn().mockReturnValue('secret');

        middleware.use(req, res, next);

        expect(jwtService.verify).toHaveBeenCalledWith('valid_token', {
            secret: 'secret',
        });
        expect(req['role']).toBe(Role.Admin);
        expect(next).toHaveBeenCalled();
    });
});
