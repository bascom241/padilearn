import { useMutation } from "@tanstack/react-query";
import { joinWorkshop } from "../services/workshopService";

export const useJoinWorkshop = () => {
  return useMutation({
    mutationFn: joinWorkshop,
  });
};
