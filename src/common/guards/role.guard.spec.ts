import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '../constants/constants';
import { RolesGuard } from './role.guard';

describe('RolesGuard', () => {
    let guard: RolesGuard;
    let reflector: Reflector;

    beforeEach(async () => {
        reflector = {
            get: jest.fn(),
        } as any;
        reflector.get = jest.fn().mockReturnValue([Role.Admin]);

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RolesGuard,
                {
                    provide: Reflector,
                    useValue: reflector,
                },
            ],
        }).compile();

        guard = module.get<RolesGuard>(RolesGuard);
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
    });

    it('should allow access if user has the required role', async () => {
        const context = createExecutionContext({ role: Role.Admin });

        const result = await guard.canActivate(context);

        expect(result).toBe(true);
    });

    it('should deny access if user does not have the required role', async () => {
        const context = createExecutionContext({ role: Role.User });

        const result = await guard.canActivate(context);

        expect(result).toBe(false);
    });

    it('should allow access if no required role', async () => {
        const context = createExecutionContext({ role: Role.User });
        reflector.get = jest.fn().mockReturnValue(null);

        const result = await guard.canActivate(context);

        expect(result).toBe(true);
    });

    function createExecutionContext(request: any): ExecutionContext {
        return {
            switchToHttp: () => ({
                getRequest: () => request,
            }),
            getHandler: () => {},
        } as ExecutionContext;
    }
});
