import { IHttpResponse } from "src/presentation/protocols/Http.interface";

export const ok = (body: any): IHttpResponse => ({
  statusCode: 200,
  body,
});

export const created = (body: any): IHttpResponse => ({
  statusCode: 201,
  body,
});

export const badRequest = (errors: Error[]): IHttpResponse => ({
  statusCode: 400,
  body: { message: "Request contains invalid data", errors },
});

export const notFound = (message: string): IHttpResponse => ({
  statusCode: 404,
  body: { message },
});

export const internalServerError = (error: string): IHttpResponse => ({
  statusCode: 500,
  body: { message: error },
});
