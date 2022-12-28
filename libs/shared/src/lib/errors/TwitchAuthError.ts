import { BaseError } from './BaseError';

export class TwitchAuthError extends BaseError {
  constructor() {
    super('TWITCH_AUTH_ERROR', {
      fr: `Erreur lors de l'authentification à Twitch`,
      en: 'Error while authenticating to Twitch',
    });
  }
}
