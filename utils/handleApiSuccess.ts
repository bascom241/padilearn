import { toast } from "./toast";

interface ApiSuccessResponse {
  success?: boolean;
  message?: string;
  data?: { message?: string };
}

// `title` is what the caller always passes (e.g. "Login successful") — the
// backend's response shapes are inconsistent about where (or whether) a
// human-readable message lives, so it's used as an optional subtitle only.
export const handleApiSuccess = (
  response: ApiSuccessResponse,
  title: string
) => {
  const detail = response?.data?.message ?? response?.message;
  toast.success(title, detail);
};
