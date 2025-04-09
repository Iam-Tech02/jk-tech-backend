// src/auth/strategies/facebook.strategy.ts

import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-facebook-token';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook-token') {
  constructor() {
    super({
      clientID: 'YOUR_FACEBOOK_APP_ID',
      clientSecret: 'YOUR_FACEBOOK_APP_SECRET',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    // Here you can handle the user (e.g. create user if not exists)
    const { id, displayName, emails } = profile;

    const user = {
      facebookId: id,
      name: displayName,
      email: emails?.[0]?.value,
    };

    done(null, user);
  }
}
