export interface IHttpRequest {
  headers?: any;
  params?: any;
  body?: any;
}

export interface IHttpResponse {
  statusCode: number;
  body?: any;
}
