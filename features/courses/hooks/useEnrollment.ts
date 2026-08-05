import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  initializeEnrollment,
  verifyEnrollment,
  getEnrollmentStatus,
} from "../services/enrollmentService";

export const useEnrollmentStatus = (courseId?: string) => {
  return useQuery({
    queryKey: ["enrollment-status", courseId],
    queryFn: () => getEnrollmentStatus(courseId as string),
    enabled: Boolean(courseId),
  });
};

export const useInitializeEnrollment = () => {
  return useMutation({
    mutationFn: initializeEnrollment,
  });
};

export const useVerifyEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyEnrollment,
    onSuccess: (_data, reference) => {
      queryClient.invalidateQueries({ queryKey: ["enrollment-status"] });
      queryClient.invalidateQueries({ queryKey: ["course"] });
    },
  });
};
