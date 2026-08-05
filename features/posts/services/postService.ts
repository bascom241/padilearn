import { apiClient } from "@/api/apiClient";
import type { Pagination, Post } from "../types/Post";

export const getFeed = async (
  params: { page?: number; limit?: number } = {},
): Promise<{ posts: Post[]; pagination: Pagination }> => {
  const response = await apiClient.get("/posts", { params });
  return { posts: response.data.posts, pagination: response.data.pagination };
};

export const createPost = async (data: { content: string; tag?: string }): Promise<Post> => {
  const response = await apiClient.post("/posts", data);
  return response.data.data;
};

export const toggleLike = async (postId: string) => {
  const response = await apiClient.post(`/posts/${postId}/like`);
  return response.data.data as { active: boolean };
};

export const toggleRetweet = async (postId: string) => {
  const response = await apiClient.post(`/posts/${postId}/retweet`);
  return response.data.data as { active: boolean };
};

export const deletePost = async (postId: string) => {
  await apiClient.delete(`/posts/${postId}`);
};
