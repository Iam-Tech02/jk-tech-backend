import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Public, User } from 'src/common/decorators';
import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from './auth.service';
import { BrowserLoginDto, LoginDto } from './dto/login.dto';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { FacebookOAuthGuard } from './guards/facebook-oauth.guard';
import { OAuth2Client } from 'google-auth-library';

@Controller({
  path: 'auth',
  version: '1',
})
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() payload: LoginDto) {
    const { email, password } = payload;
    const result = await this.authService.login(email, password);
    return result;
  }

  @Public()
  @UseGuards(GoogleOAuthGuard)
  @Get('google/login')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleOAuthLogin() {}

  @UseGuards(GoogleOAuthGuard)
  @ApiExcludeEndpoint()
  @Public()
  @Get('google/redirect')
  async googleOAuthRedirect(@User() googleUser: Record<string, string>) {
    let user = await this.userService.findOneByEmail(googleUser.email);
    let userId: number = user?.id;
    if (!user) {
      user = (await this.userService.saveOAuthUser(
        googleUser.email,
        googleUser.name,
        true,
      )) as any;
      userId = user.id;
    }
    const access_token = await this.authService.signJwt(userId, user.role.name);
    return {
      access_token,
    };
  }

  @Public()
  @UseGuards(FacebookOAuthGuard)
  @Get('facebook/login')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async facebookOAuthLogin() {}

  @UseGuards(FacebookOAuthGuard)
  @ApiExcludeEndpoint()
  @Public()
  @Get('facebook/redirect')
  async facebookOAuthRedirect(@User() facebookUser: Record<string, string>) {
    let user = await this.userService.findOneByEmail(facebookUser.email);
    let userId: number = user?.id;
    if (!user) {
      user = (await this.userService.saveOAuthUser(
        facebookUser.email,
        facebookUser.name,
        true,
      )) as any;
      userId = user.id;
    }
    const access_token = await this.authService.signJwt(userId, user.role.name);
    return {
      access_token,
    };
  }

  @Public()
  @Post('/browser/login')
  async browserLogin(@Body() payload: BrowserLoginDto) {
    const { provider, user } = payload;
    await this.verifyToken(provider, user);
    const foundUser = await this.userService.findOneByEmail(user.email);
    let userId: number;
    let roleName: string;

    if (!foundUser) {
      const savedUser = await this.userService.saveOAuthUser(
        user.email,
        user.name,
        true,
      );
      userId = savedUser.id;
      roleName = savedUser.role.name;
    } else {
      userId = foundUser.id;
      roleName = foundUser.role.name;
    }

    const access_token = await this.authService.signJwt(userId, roleName);
    return {
      access_token,
      user: {
        id: userId,
        email: user.email,
        name: user.name,
        role: roleName
      }
    };
  }

  async verifyToken(provider: string, user: BrowserLoginDto['user']) {
    switch (provider) {
      case 'google':
        const oauth = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);
        await oauth.verifyIdToken({
          idToken: user.token,
        });
        break;

      case 'facebook':
        const profile = await (
          await fetch(
            `https://graph.facebook.com/${user.id}?access_token=${user.token}`,
          )
        ).json();
        if (profile.error) {
          throw new UnauthorizedException();
        }
        break;
      default:
        throw new UnauthorizedException('Invalid Provider');
    }
  }
}
