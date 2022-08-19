import { IHttpResponse } from "@presentation/protocols/Http.interface";

export const created = (body: any): IHttpResponse => ({
  statusCode: 201,
  body,
});

export const badRequest = (errors: Error[]): IHttpResponse => ({
  statusCode: 400,
  body: { message: "Request contains invalid data", errors },
});

export const internalServerError = (error: string): IHttpResponse => ({
  statusCode: 500,
  body: error,
});
