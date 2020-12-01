import React from "react";
import { TextField } from "@material-ui/core";

export default function Login({ errors, inputs, handleInputChange, renderErrors }) {
  const {
    password: passwordErrors,
  } = errors;
  return (
    <TextField
    error={passwordErrors.length > 0}
    helperText={passwordErrors.length > 0 && renderErrors(passwordErrors)}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      value={inputs.password}
      autoComplete="current-password"
      onChange={(e) => handleInputChange(e)}
    />
  );
}
