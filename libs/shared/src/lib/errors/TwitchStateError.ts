import { BaseError } from './BaseError';

export class TwitchStateError extends BaseError {
  constructor() {
    super('TWITCH_STATE_ERROR', {
      fr: `Le state renvoyé par Twitch pour l'authentification n'existe pas ou a expiré.`,
      en: 'The state returned by Twitch for authentication does not exist or has expired.',
    });
  }
}
