import { useQuery } from "@tanstack/react-query";
import { getLessonVideoPlayback } from "../services/courseService";

export const useLessonVideoPlayback = (lessonId?: string) => {
  return useQuery({
    queryKey: ["lesson-video-playback", lessonId],
    queryFn: () => getLessonVideoPlayback(lessonId as string),
    enabled: Boolean(lessonId),
  });
};
