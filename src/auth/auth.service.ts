import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { User } from '../typeorm/entities/User';

@Injectable()
export class AuthService {
  private blacklistedTokens: Set<string> = new Set();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // ฟังก์ชันลงทะเบียน
  async register(username: string, password: string): Promise<User> {
    return this.usersService.createUser({ username, password });
  }

  // ฟังก์ชันเข้าสู่ระบบ
  async login(username: string, password: string) {
    // ตรวจสอบข้อมูลผู้ใช้
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // ตรวจสอบ password
    if (user.password !== password) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  // ฟังก์ชันตรวจสอบผู้ใช้
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);
    return user && user.password === password ? user : null;
  }

  // ฟังก์ชันออกจากระบบ
  async logout(token: string): Promise<string> {
    try {
      const payload = this.jwtService.verify(token);
      if (!payload.sub) {
        throw new UnauthorizedException('JWT missing subject (sub) property');
      }
      this.blacklistedTokens.add(token);
      return 'Logout successful';
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }
}
