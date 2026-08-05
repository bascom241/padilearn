import { useQuery } from "@tanstack/react-query";
import { getWorkshops } from "../services/workshopService";

export const useWorkshops = (status?: string) => {
  return useQuery({
    queryKey: ["workshops", status],
    queryFn: () => getWorkshops(status ? { status } : {}),
    refetchInterval: 15000,
  });
};
