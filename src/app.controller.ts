import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiQuery } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Role } from './common/constants/constants';
import { JwtPayload } from './jwt/jwt.type';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    @ApiQuery({ name: 'role', enum: Role })
    @Get('/token')
    getToken(@Query('role') role: Role): Promise<string> {
        const payload: JwtPayload = {
            role,
        };

        return this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('TOKEN_SECRET'),
            expiresIn: '1y',
        });
    }
}
