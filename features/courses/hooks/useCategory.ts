import { getAllCategories } from "../services/categoryService";
import { useQuery } from "@tanstack/react-query";

export const CATEGORY_KEYS = {
    all: ["categories"] as const, 
    lists: () => [...CATEGORY_KEYS.all, "lists"],
    details: () => [...CATEGORY_KEYS.all, "detail" ] as const , 
    detail: (id: number) => [...CATEGORY_KEYS.details(), id] as const
}

export const useGetAllCategories = () => {
    return useQuery({
        queryKey: CATEGORY_KEYS.lists(), 
        queryFn: getAllCategories
    })
}