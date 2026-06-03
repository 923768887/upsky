import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../supabase.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private supabaseService: SupabaseService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    } as any);
  }

  async validate(request: Request, payload: { sub: string; email: string }) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request as any);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const user = await this.supabaseService.verifyToken(token);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return { id: payload.sub, email: payload.email };
  }
}
