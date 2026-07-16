import { AxiosError } from "axios";

interface ApiErrorItem {
  field: string | null;
  message: string;
}

interface ApiErrorResponse {
  success: false;
  status: number;
  code: string;
  message: string;
  errors: ApiErrorItem[];
  timestamp: string;
  path: string;
}

export const getApiErrorMessage = (error: unknown): string => {
  // Axios Error
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;

    if (!data) {
      return "Unable to connect. Please check your internet connection.";
    }

    // Validation Errors
    if (data.errors?.length) {
      return data.errors.map(err => err.message).join("\n");
    }

    // General API Error
    if (data.message) {
      return data.message;
    }

    return "Something went wrong.";
  }

  // Normal Error
  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
};