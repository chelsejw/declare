import React from "react";

import { Typography, Link } from "@material-ui/core";
import FAQModal from './faq/FAQModal';

export default function Copyright() {
  const [open, setOpen] = React.useState(false);

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="primary" href="https://github.com/chelsejw">
        Chelsea E.
      </Link>{" "}
      {new Date().getFullYear()}
      {". | "}
      <Link color="primary" href="https://github.com/chelsejw/declare">
        Github Repo
      </Link>
      {" | "}
      <Link href="#" onClick={() => setOpen(true)} color="primary">
        FAQ
      </Link>
      <div>
      <FAQModal
      open={open}
      onClose={() => setOpen(false)}
      />
      </div>
    </Typography>
  );
}
