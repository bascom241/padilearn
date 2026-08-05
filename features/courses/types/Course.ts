export interface Instructor {
  _id: string;
  fullName: string;
  email: string;
}

export interface CourseSummary {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  isPublished: boolean;
  instructor: Instructor | string;
  createdAt: string;
}

export interface LessonVideoSummary {
  id: string;
  status: "created" | "uploading" | "processing" | "ready" | "failed";
  duration: number;
}

export interface CourseLesson {
  id: string;
  title: string;
  description: string;
  order: number;
  isPreview: boolean;
  isLocked: boolean;
  duration: number;
  video: LessonVideoSummary | null;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: number;
  lessonCount: number;
  lessons: CourseLesson[];
}

export interface CourseDetail {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  level: string;
  price: number;
  isPublished: boolean;
  instructor: Instructor;
  totalLessons: number;
  totalDuration: number;
  isEnrolled: boolean;
  modules: CourseModule[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ListCoursesParams {
  category?: string;
  level?: string;
  search?: string;
  isPublished?: boolean;
  page?: number;
  limit?: number;
}
