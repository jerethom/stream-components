import { BaseError } from '@stream-components/shared';

export const errorTransformer = {
  toQueryUrl(error: BaseError): string {
    return `code=${error.code}&messageFr=${encodeURIComponent(
      error.content.fr
    )}&messageEn=${encodeURIComponent(error.content.en)}`;
  },
  toHeaderRequest(error: BaseError): [string, string][] {
    return [
      ['x-error-code', error.code],
      ['x-error-message-fr', encodeURIComponent(error.content.fr)],
      ['x-error-message-en', encodeURIComponent(error.content.en)],
    ];
  },
};
