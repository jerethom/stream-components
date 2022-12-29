export abstract class BaseError extends Error {
  protected constructor(
    public readonly code: string,
    public readonly content: { fr: string; en: string }
  ) {
    super();
  }
}
