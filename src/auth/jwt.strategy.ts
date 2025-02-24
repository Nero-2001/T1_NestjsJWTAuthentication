import { Injectable, UnauthorizedException } from '@nestjs/common'; // เพิ่ม import ที่นี่
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { User } from '../typeorm/entities/User';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your-secret-key',
    });
  }

  async validate(payload: { username: string; sub: number }) {
    if (!payload.sub) {
      throw new UnauthorizedException('JWT missing subject (sub) property');
    }

    if (this.authService.isTokenBlacklisted(payload.sub.toString())) {
      throw new UnauthorizedException('Token is blacklisted');
    }

    return { userId: payload.sub, username: payload.username };
  }
}

