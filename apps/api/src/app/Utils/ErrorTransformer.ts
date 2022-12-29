import { BaseError } from '@stream-components/shared';

export const errorTransformer = {
  toQueryUrl(error: BaseError): string {
    return `errorCode=${error.code}&errorMessageFr=${encodeURIComponent(
      error.content.fr
    )}&errorMessageEn=${encodeURIComponent(error.content.en)}`;
  },
  toHeaderRequest(error: BaseError): [string, string][] {
    return [
      ['x-error-code', error.code],
      ['x-error-message-fr', encodeURIComponent(error.content.fr)],
      ['x-error-message-en', encodeURIComponent(error.content.en)],
    ];
  },
};
