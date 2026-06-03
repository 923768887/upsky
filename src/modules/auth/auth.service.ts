import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from './supabase.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private supabaseService: SupabaseService,
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
    const data = await this.supabaseService.signUp(email, password);
    return data.user;
  }

  async verifyToken(token: string) {
    return this.supabaseService.verifyToken(token);
  }
}
