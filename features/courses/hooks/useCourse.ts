import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "../services/courseService";

export const useCourse = (courseId?: string) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseById(courseId as string),
    enabled: Boolean(courseId),
  });
};
