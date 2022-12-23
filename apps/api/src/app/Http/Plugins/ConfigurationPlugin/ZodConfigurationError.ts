import { ZodError, ZodIssue } from 'zod';

export class ZodConfigurationError extends Error {
  public readonly errors: string[][];

  constructor(message: string, zodError: ZodError) {
    super(message);
    this.errors = zodError.errors.map((issue: ZodIssue) => [
      issue.path.join('.'),
      issue.message,
    ]);
  }
}
