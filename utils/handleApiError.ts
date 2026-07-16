import { getApiErrorMessage } from "./getApiErrorMessage";
import { toast } from "./toast";

export const handleApiError = (error: unknown) => {
  toast.error(getApiErrorMessage(error));
};