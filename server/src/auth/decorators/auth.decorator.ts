import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { OnlyAdminGuard } from '../guards/only-admin.guard';

type TypeRole = 'ADMIN' | 'USER' | undefined;

export const Auth = (role: TypeRole = 'ADMIN') =>
  applyDecorators(
    role === 'ADMIN'
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : UseGuards(JwtAuthGuard),
  );
