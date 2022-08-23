export const rejectValueOnce = (returnValue: any) =>
  jest.fn().mockRejectedValueOnce(returnValue);

export const resolveValueOnce = (returnValue: any) =>
  jest.fn().mockResolvedValueOnce(returnValue);

export const rejectValue = (returnValue: any) =>
  jest.fn().mockRejectedValue(returnValue);

export const resolveValue = (returnValue: any) =>
  jest.fn().mockResolvedValue(returnValue);
