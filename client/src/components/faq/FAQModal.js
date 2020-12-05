import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Modal, Typography } from "@material-ui/core";
import FAQItem from "./FAQItem";
// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const FAQ = [
  {
    question: "Who is this app for?",
    answer:
      "It's for GA SG students and team.",
  },
  {
    question: "Things taking a while to load?",
    answer:
      "The API server might be restarting after being idle – unless an error message pops up, give it some time.",
  },
  {
    question: "Forgot your password?",
    answer:
      "The app has no feature to reset your password at the moment LOL. Contact me, and we'll figure something out.",
  },
  {
    question: "Can I configure the declaration fields? ",
    answer:
      "Not yet – but it is a feature I will be working on. You may check the Github Repo link for planned features / updates.",
  },
  {
    question: "Can I contribute to the app as a developer?",
    answer:
      "YES X1000! You can clone my repo, add your improvements, and open a PR describing the changes you made. I would be especially happy for React developers to contribute. :)",
  },
];

const items = FAQ.map(({ question, answer }, index) => {
  return <FAQItem key={index} question={question} answer={answer} />;
});

const FAQModal = ({ open, onClose }) => {
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={() => onClose()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <Box my={2}>
          <Typography variant="h4" color="primary" align="center">
            FAQ
          </Typography>
        </Box>

        {items}
        <Box my={2}>
          <Typography variant="body2" color="textSecondary" align="center">
            Click anywhere outside the box to close this window.
          </Typography>
        </Box>
      </div>
    </Modal>
  );
};

export default FAQModal;
