import { BaseError } from './BaseError';

export class TwitchTokenError extends BaseError {
  constructor() {
    super('TWITCH_TOKEN_ERROR', {
      fr: `Erreur lors de l'obtention du token Twitch.`,
      en: 'Error when obtaining the Twitch token.',
    });
  }
}
