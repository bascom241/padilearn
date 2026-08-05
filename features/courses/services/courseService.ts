import { apiClient } from "@/api/apiClient";
import type { CourseDetail, CourseSummary, ListCoursesParams, Pagination } from "../types/Course";

export const getCourses = async (
  params: ListCoursesParams = {},
): Promise<{ courses: CourseSummary[]; pagination: Pagination }> => {
  const { isPublished, ...rest } = params;
  const response = await apiClient.get("/courses", {
    params: {
      ...rest,
      ...(isPublished !== undefined && { isPublished: String(isPublished) }),
    },
  });
  return { courses: response.data.courses, pagination: response.data.pagination };
};

export const getCourseById = async (courseId: string): Promise<CourseDetail> => {
  const response = await apiClient.get(`/courses/${courseId}`);
  return response.data.data;
};

export const getLessonVideoPlayback = async (lessonId: string) => {
  const response = await apiClient.get(`/lessons/${lessonId}/video/playback`);
  return response.data.data as {
    status: string;
    duration: number;
    playbackUrl: string | null;
    thumbnailUrl: string | null;
  };
};
