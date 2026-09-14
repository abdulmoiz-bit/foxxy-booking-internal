import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: (data) => {
      toast.success("New cabin successfully created");
      queryClient.setQueryData(["cabins"], (oldCabins = []) =>
        oldCabins.some((cabin) => cabin.id === data.id)
          ? oldCabins.map((cabin) => (cabin.id === data.id ? data : cabin))
          : [...oldCabins, data]
      );
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
