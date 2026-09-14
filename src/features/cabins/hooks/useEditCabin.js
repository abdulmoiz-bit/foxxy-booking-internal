import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: (data) => {
      toast.success("Cabin successfully edited");
      queryClient.setQueryData(["cabins"], (oldCabins = []) =>
        oldCabins.map((cabin) => (cabin.id === data.id ? data : cabin))
      );
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
