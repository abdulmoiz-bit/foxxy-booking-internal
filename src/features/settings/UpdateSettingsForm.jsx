import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "../../shared/ui/Button";
import Form from "../../shared/ui/Form";
import FormRow from "../../shared/ui/FormRow";
import Input from "../../shared/ui/Input";
import Spinner from "../../shared/ui/Spinner";
import { useSettings } from "./hooks/useSettings";
import { useUpdateSetting } from "./hooks/useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      minBookingLength: minBookingLength ?? 1,
      maxBookingLength: maxBookingLength ?? 1,
      maxGuestsPerBooking: maxGuestsPerBooking ?? 1,
      breakfastPrice: breakfastPrice ?? 0,
    },
  });

  useEffect(() => {
    reset({
      minBookingLength: minBookingLength ?? 1,
      maxBookingLength: maxBookingLength ?? 1,
      maxGuestsPerBooking: maxGuestsPerBooking ?? 1,
      breakfastPrice: breakfastPrice ?? 0,
    });
  }, [breakfastPrice, maxBookingLength, maxGuestsPerBooking, minBookingLength, reset]);

  if (isLoading) return <Spinner />;

  function onSubmit(data) {
    updateSetting({
      minBookingLength: Number(data.minBookingLength),
      maxBookingLength: Number(data.maxBookingLength),
      maxGuestsPerBooking: Number(data.maxGuestsPerBooking),
      breakfastPrice: Number(data.breakfastPrice),
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          {...register("minBookingLength", {
            required: "This field is required",
            min: { value: 1, message: "Value should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          {...register("maxBookingLength", {
            required: "This field is required",
            min: { value: 1, message: "Value should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          {...register("maxGuestsPerBooking", {
            required: "This field is required",
            min: { value: 1, message: "Value should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          {...register("breakfastPrice", {
            required: "This field is required",
            min: { value: 0, message: "Value should be at least 0" },
          })}
        />
      </FormRow>

      <FormRow>
        <Button disabled={isUpdating}>Update settings</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
