import React from "react";
import { TextField } from "@material-ui/core";

export default function Register({ inputs, handleInputChange }) {
  return (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="ga_email"
        label="GA Email Address"
        name="ga_email"
        // autoComplete="email"
        autoFocus
        value={inputs.ga_email}
        onChange={(e) => handleInputChange(e)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        autoComplete="password"
        autoFocus
        type="password"
        value={inputs.password}
        onChange={(e) => handleInputChange(e)}
      />
      {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="verify_pass"
              label="Verify Password"
              name="verify_pass"
              autoComplete="password"
              autoFocus
              value={inputs.password}
              onChange={(e)=> handleInputChange(e)}
            /> */}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="mobile"
        label="Contact Number"
        name="mobile"
        autoComplete="mobile"
        autoFocus
        value={inputs.mobile}
        onChange={(e) => handleInputChange(e)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="full_name"
        label="Full Name (as in NRIC)"
        name="full_name"
        autoComplete="full_name"
        autoFocus
        value={inputs.full_name}
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
}
