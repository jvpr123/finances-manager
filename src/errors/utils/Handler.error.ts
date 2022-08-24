import {
  internalServerError,
  badRequest,
  notFound,
} from "src/presentation/utils/http/HttpResponse.factory";

export const errorHandler = (error: any) => {
  if (error?.name === "VALIDATION_ERROR") {
    return badRequest(error?.errors);
  }

  if (error?.name === "NOT_FOUND_ERROR") {
    return notFound(error?.message);
  }

  return internalServerError(error?.message);
};
