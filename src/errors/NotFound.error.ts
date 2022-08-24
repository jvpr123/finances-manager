export class NotFoundError extends Error {
  name: string;
  message: string;
  stack?: string;

  constructor(message?: string) {
    super(message ? message : "Not found");
    this.name = "NOT_FOUND_ERROR";
  }
}
