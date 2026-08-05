import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkshop, startWorkshop } from "../services/workshopService";

export const useCreateAndStartWorkshop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { title: string; description: string }) => {
      const workshop = await createWorkshop(data);
      return startWorkshop(workshop._id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workshops"] });
    },
  });
};
