import { BaseError } from './BaseError';

export class TwitchUserError extends BaseError {
  constructor() {
    super('TWITCH_USER_ERROR', {
      fr: `Erreur lors de l'obtention des données de l'utilisateur.`,
      en: `Error when obtaining the user's data.`,
    });
  }
}
