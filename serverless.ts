import type { AWS } from "@serverless/typescript";

import createUser from "@functions/users/create/CreateUserEvent";
import findUserByEmail from "@functions/users/findByEmail/FindUserByEmailEvent";
import findAllUsers from "@functions/users/findAll/FindAllUsersEvent";
import deleteUser from "@functions/users/delete/DeleteUserEvent";

const serverlessConfiguration: AWS = {
  service: "service--serverless",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: { createUser, findUserByEmail, findAllUsers, deleteUser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    "serverless-offline": {
      httpPort: 3030,
    },
  },
};

module.exports = serverlessConfiguration;
