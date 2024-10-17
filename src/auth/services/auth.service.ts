import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: any): Promise<string> {
    const payload = { username: user.username, sub: user.userId };
    return this.jwtService.sign(payload);
  }

  async validateUser(username: string, password: string): Promise<any> {
    if (username === 'test' && password === 'password') {
      return { userId: 1, username: 'test' };
    }
    return null;
  }
}
