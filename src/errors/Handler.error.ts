import {
  internalServerError,
  badRequest,
} from "src/presentation/utils/http/HttpResponse.factory";

export const errorHandler = (error: any) => {
  console.log(error);

  if (error?.name === "VALIDATION_ERROR") {
    return badRequest(error?.errors);
  }

  return internalServerError(error?.message);
};
