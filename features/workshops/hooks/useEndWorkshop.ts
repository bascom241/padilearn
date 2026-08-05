import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endWorkshop } from "../services/workshopService";

export const useEndWorkshop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: endWorkshop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workshops"] });
    },
  });
};
