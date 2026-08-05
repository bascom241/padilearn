import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../services/courseService";
import type { ListCoursesParams } from "../types/Course";

export const useCourses = (params: ListCoursesParams = {}) => {
  return useQuery({
    queryKey: ["courses", params],
    queryFn: () => getCourses(params),
  });
};
