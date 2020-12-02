import { CHECK_EMAIL } from "../constants";

const defaultStates = {
  inputs: {
    email: "",
    password: "",
    ga_email: "",
    full_name: "",
    active: false,
    mobile: "",
    cohort: "",
  },
  message:
    "If you are registered, you will be prompted to login. If not, you will be prompted to register.",
  stage: CHECK_EMAIL,
  errors: {
    ga_email: [],
    email: [],
    full_name: [],
    mobile: [],
    password: [],
    cohort: [],
  },
  buttonText: CHECK_EMAIL,
  user: { email: "" },
  loading: false,
  profileChanged: false,
};

export default defaultStates;
