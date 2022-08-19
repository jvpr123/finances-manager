import { IHttpResponse } from "@presentation/protocols/Http.interface";

export const created = (body: any): IHttpResponse => ({
  statusCode: 201,
  body,
});

export const internalServerError = (error: string): IHttpResponse => ({
  statusCode: 500,
  body: error,
});
