import { useQuery } from "@tanstack/react-query";
import { getFeed } from "../services/postService";

export const useFeed = () => {
  return useQuery({
    queryKey: ["feed"],
    queryFn: () => getFeed(),
  });
};
