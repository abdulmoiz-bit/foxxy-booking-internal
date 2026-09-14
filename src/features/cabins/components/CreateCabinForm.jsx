import { useForm } from "react-hook-form";

import Input from "../../../shared/ui/Input";
import Form from "../../../shared/ui/Form";
import Button from "../../../shared/ui/Button";
import FileInput from "../../../shared/ui/FileInput";
import Textarea from "../../../shared/ui/Textarea";
import FormRow from "../../../shared/ui/FormRow";

import { useCreateCabin } from "../hooks/useCreateCabin";
import { useEditCabin } from "../hooks/useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    mode: "onChange",
    defaultValues: isEditSession
      ? {
          ...editValues,
          discount: editValues.discount ?? 0,
          maxCapacity: editValues.maxCapacity ?? "",
          regularPrice: editValues.regularPrice ?? "",
        }
      : { discount: 0 },
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image =
      typeof data.image === "string"
        ? data.image
        : data.image?.[0] ?? (isEditSession ? editValues.image : null);

    const cabinData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      regularPrice: Number(data.regularPrice),
      discount: Number(data.discount || 0),
      image,
    };

    if (isEditSession)
      editCabin(
        { newCabinData: cabinData, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(cabinData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
  }

  function onError(errors) {
    // console.log(errors);
  }
  /*
  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  
  // Watch the value of regularPrice
  const regularPrice = watch("regularPrice");
*/
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>  value <= getValues().regularPrice || "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form> 
  );
}

export default CreateCabinForm;
