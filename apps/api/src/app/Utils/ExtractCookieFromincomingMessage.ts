import { IncomingMessage } from 'node:http';

export function extractCookieFromIncomingMessage(
  message: IncomingMessage
): Record<string, string> {
  const cookieIndex = message.rawHeaders.findIndex((el) => el === 'cookie');
  if (cookieIndex === -1) {
    return {};
  }

  const rawHeaderCookie = message.rawHeaders[cookieIndex + 1];
  return rawHeaderCookie.split('; ').reduce((previousValue, currentValue) => {
    const [key, value] = currentValue.split('=');
    return { ...previousValue, [key]: value };
  }, {});
}
