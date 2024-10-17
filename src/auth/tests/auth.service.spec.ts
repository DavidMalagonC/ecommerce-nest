import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service'
import { JwtService } from '@nestjs/jwt';
import { mock, MockProxy } from 'jest-mock-extended';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: MockProxy<JwtService>;

  beforeEach(async () => {
    jwtService = mock<JwtService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should return a JWT token for a valid payload', async () => {
    const user = { userId: 1, username: 'test' };
    const payload = { username: user.username, sub: user.userId };
    jwtService.sign.mockReturnValue('valid.jwt.token');

    const result = await service.generateToken(user);
    console.log('RESULT ', result);
    expect(result).toEqual('valid.jwt.token');
    expect(jwtService.sign).toHaveBeenCalledWith(payload);
  });
});
