import { toast } from "./toast";

interface ApiSuccessResponse {
  success: true;
  status: number;
  message: string;
}

export const handleApiSuccess = (
  response: ApiSuccessResponse,
  description?: string
) => {
  toast.success(response.message, description);
};