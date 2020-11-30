import React from "react";
import { TextField } from "@material-ui/core";

export default function Login({ inputs, handleInputChange }) {
  return (
    <TextField
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
