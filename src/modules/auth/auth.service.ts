import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/configurations/app.config';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  private getJwtSecret() {
    return this.configService.getOrThrow<AppConfig['jwt']['secret']>(
      'jwt.secret',
    );
  } 

  private getJwtExpiry() {
    return this.configService.getOrThrow<AppConfig['jwt']['expiry']>(
      'jwt.expiry',
    );
  }

  async matchPassword(hashedPassword: string, plainPassword: string) {
    const isMatch = await compare(plainPassword, hashedPassword);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
  }

  isEntityFound<T>(entity: T) {
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  private getJwtSignOptions(): JwtSignOptions {
    const jwtSecret = this.getJwtSecret();
    const jwtExpiry = this.getJwtExpiry();
    return {
      secret: jwtSecret,
      expiresIn: jwtExpiry,
    };
  }

  private makeJwtPayload(id: number, role: string) {
    return { id, role };
  }

  signJwt(userId: number, role: string) {
    const payload = this.makeJwtPayload(userId, role);
    const JwtSignOptions = this.getJwtSignOptions();
    return this.jwtService.signAsync(payload, JwtSignOptions);
  }
}
