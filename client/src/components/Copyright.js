import React from "react";

import { Typography, Link, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
      <Link onClick={() => setOpen(true)} color="primary">
        FAQ
      </Link>
      <div>
      <FAQModal
      open={open}
      onClose={() => setOpen(false)}
      />

        {/* <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <Typography variant="body2" color="textSecondary" align="center">
              <Typography variant="h4" color="primary" align="center">
                Quick FAQ
              </Typography>

              <p>
                <Typography
                  variant="body2"
                  display="inline"
                  color="textPrimary"
                >
                  Who is the app for?{" "}
                </Typography>
                Currently, it only sends forms{" "}
                <Typography
                  variant="body2"
                  display="inline"
                  color="textPrimary"
                >
                  for GA Singapore students
                </Typography>
                .
              </p>
              <p>
                Things taking a while to load? The API might be restarting after
                being idle.
              </p>
              <p>
                Forgot your password? The app has no feature to reset your
                password at the moment LOL. Contact me to figure something out!
              </p>
              <p>
                Can I configure the declaration fields? Not at the moment – but
                it is a feature I will be working on.
              </p>
            </Typography>
          </div>
        </Modal> */}
      </div>
    </Typography>
  );
}
