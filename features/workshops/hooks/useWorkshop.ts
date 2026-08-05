import { useQuery } from "@tanstack/react-query";
import { getWorkshopById } from "../services/workshopService";

export const useWorkshop = (workshopId?: string) => {
  return useQuery({
    queryKey: ["workshop", workshopId],
    queryFn: () => getWorkshopById(workshopId as string),
    enabled: Boolean(workshopId),
    refetchInterval: 10000,
  });
};
