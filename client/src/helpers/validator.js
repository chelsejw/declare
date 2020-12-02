export default function formValidator(inputTypes, inputs) {
  let types = inputTypes.split(", ");
  // console.log(`Validating ${types}`);
  const errors = {};
  let isValid = true;
  types.forEach((type) => {
    if (type === "email") {
      const { email } = inputs;
      errors.email = [];
      const emailRegex = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
      if (!emailRegex.test(email)) {
        errors.email.push("Your email does not have valid email syntax.");
        isValid = false;
      }
    }

    if (type === "ga_email") {
      const { ga_email } = inputs;
      errors.ga_email = [];
      const emailRegex = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
      if (!emailRegex.test(ga_email)) {
        isValid = false;
        errors.ga_email.push("Your GA email does not have valid email syntax.");
      }
    }

    if (type === "full_name") {
      const { full_name } = inputs;
      errors.full_name = [];
      if (full_name.length < 2) {
        errors.full_name.push("Name should be at least 2 characters long.");
        isValid = false;
      }
    }
    if (type === "password") {
      const { password } = inputs;
      errors.password = [];
      if (password.length < 6) {
        errors.password.push("Password should be at least 6 characters long.");
        isValid = false;
      }
    }

    if (type === "mobile") {
      const { mobile } = inputs;
      errors.mobile = [];
      const mobileRegEx = new RegExp(/^[0-9\s+-]*$/); // matches digits, whitespace, + and -
      if (!mobileRegEx.test(mobile)) {
        errors.mobile.push(
          "Number does not look valid. It should only contain numbers, whitespace, (+)s or (-)s."
        );
        isValid = false;
      }
      if (mobile.length < 8) {
        errors.mobile.push(`Number should be at least 8 digits long.`);
        isValid = false;
      }
    }
    if (type === "cohort") {
      const { cohort } = inputs;
      errors.cohort = [];
      if (cohort==="") {
        errors.cohort.push("Please select a cohort.")
      }
    }
  });

  return { isValid, errors };
}
