import {
  internalServerError,
  badRequest,
} from "@core/presentation/utils/http/HttpResponse.factory";

export const errorHandler = (error: any) => {
  if (error?.name === "VALIDATION_ERROR") {
    return badRequest(error?.errors);
  }

  return internalServerError(error?.message);
};
