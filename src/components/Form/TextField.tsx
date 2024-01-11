import { InputAdornment, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { ErrorIcon } from "../icons";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { ReactNode } from "react";

interface TextFieldProps<T extends FieldValues> extends Omit<MuiTextFieldProps, "name"> {
  register: UseFormRegister<T>;
  startIcon?: ReactNode;
  name: Path<T>;
}

export default function TextField<T extends FieldValues>({ register, name, startIcon, ...restProps }: TextFieldProps<T>) {
  return (
    <MuiTextField
      {...register(name!)}
      name={name}
      InputProps={{
        endAdornment: restProps.error ? (
          <InputAdornment position="end">
            <ErrorIcon color="error" />
          </InputAdornment>
        ) : null,
        startAdornment: startIcon ? <InputAdornment position="start">{startIcon}</InputAdornment> : null,
      }}
      {...restProps}
    />
  );
}
