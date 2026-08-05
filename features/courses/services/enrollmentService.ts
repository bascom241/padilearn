import { apiClient } from "@/api/apiClient";
import type { EnrollmentStatus, InitializeEnrollmentResult } from "../types/Enrollment";

export const initializeEnrollment = async (
  courseId: string,
): Promise<InitializeEnrollmentResult> => {
  const response = await apiClient.post("/enrollments/initialize", { courseId });
  return response.data.data;
};

export const verifyEnrollment = async (reference: string) => {
  const response = await apiClient.get(`/enrollments/verify/${reference}`);
  return response.data.data;
};

export const getEnrollmentStatus = async (courseId: string): Promise<EnrollmentStatus> => {
  const response = await apiClient.get(`/enrollments/course/${courseId}/status`);
  return response.data.data;
};

export const getMyEnrollments = async () => {
  const response = await apiClient.get("/enrollments/my");
  return response.data.data;
};
