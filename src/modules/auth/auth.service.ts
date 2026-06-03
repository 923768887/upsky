import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from './supabase.service';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private supabaseService: SupabaseService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string) {
    const data = await this.supabaseService.signIn(email, password);
    return data.user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async register(email: string, password: string) {
    // 1. 在 Supabase Auth 中注册
    const data = await this.supabaseService.signUp(email, password);

    if (!data.user) {
      throw new Error('Registration failed');
    }

    // 2. 在 Prisma User 表中创建记录
    const user = await this.prisma.user.create({
      data: {
        id: data.user.id,
        email: data.user.email!,
      },
    });

    return user;
  }

  async verifyToken(token: string) {
    return this.supabaseService.verifyToken(token);
  }
}
