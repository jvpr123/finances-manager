import "reflect-metadata";

import { middyfy } from "@libs/lambda";
import { APIGatewayEvent } from "aws-lambda";
import { MiddyfiedHandler } from "@middy/core";
import { formatJSONResponse } from "@libs/api-gateway";

import { IController } from "src/presentation/protocols/Controller.interface";
import { IHttpRequest } from "src/presentation/protocols/Http.interface";

import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";

const extractRequestData = (event: APIGatewayEvent) => ({
  headers: event.headers,
  params: event.pathParameters,
  body: event.body,
});

export const makeServerlessHandler = (
  controller: IController
): MiddyfiedHandler => {
  const handler = async (event: APIGatewayEvent) => {
    !TypeOrmDataSource.isInitialized && (await TypeOrmDataSource.initialize());

    const httpRequest: IHttpRequest = extractRequestData(event);
    const { statusCode, body } = await controller.handle(httpRequest);

    return formatJSONResponse(statusCode, body);
  };

  return middyfy(handler);
};
