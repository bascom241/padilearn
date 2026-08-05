import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike, toggleRetweet } from "../services/postService";
import type { Post, Pagination } from "../types/Post";

type FeedCache = { posts: Post[]; pagination: Pagination };

const applyOptimisticUpdate = (
  old: FeedCache | undefined,
  postId: string,
  activeKey: "isLikedByMe" | "isRetweetedByMe",
  countKey: "likesCount" | "retweetsCount",
) => {
  if (!old) return old;
  return {
    ...old,
    posts: old.posts.map((post) =>
      post._id === postId
        ? {
            ...post,
            [activeKey]: !post[activeKey],
            [countKey]: post[countKey] + (post[activeKey] ? -1 : 1),
          }
        : post,
    ),
  };
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleLike,
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ["feed"] });
      const previous = queryClient.getQueryData<FeedCache>(["feed"]);
      queryClient.setQueryData<FeedCache>(["feed"], (old) =>
        applyOptimisticUpdate(old, postId, "isLikedByMe", "likesCount"),
      );
      return { previous };
    },
    onError: (_err, _postId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["feed"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
};

export const useToggleRetweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleRetweet,
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ["feed"] });
      const previous = queryClient.getQueryData<FeedCache>(["feed"]);
      queryClient.setQueryData<FeedCache>(["feed"], (old) =>
        applyOptimisticUpdate(old, postId, "isRetweetedByMe", "retweetsCount"),
      );
      return { previous };
    },
    onError: (_err, _postId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["feed"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
};
