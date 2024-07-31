import { Reflector } from '@nestjs/core';
import { Role } from '../constants/constants';

export const Roles = Reflector.createDecorator<Role[]>();
