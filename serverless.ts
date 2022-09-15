import type { AWS } from "@serverless/typescript";

// import usersFunctions from "@functions/users";
// import unitsFunctions from "@functions/units";
// import transactionsFunctions from "@functions/transactions";
// import categoriesFunctions from "@functions/categories";
import tagsFunctions from "@functions/tags";

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
  functions: {
    // ...usersFunctions,
    // ...unitsFunctions,
    // ...transactionsFunctions,
    // ...categoriesFunctions,
    ...tagsFunctions,
  },
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
