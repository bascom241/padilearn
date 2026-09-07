import { apiClient } from "@/api/apiClient";
import { CategoryResponse } from "../types/Category";


export const getAllCategories = async (): Promise<CategoryResponse[]> => {
    const res = await apiClient.get("/category");
    return res.data
}