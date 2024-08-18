export const validateDomain = (domain) => {
  let validation = new Validation();
  let result = domain.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (result == null) {
      validation.update({ valid: false, error: true, message: "Please enter a correct domain"});
      return validation;
  } else {
      validation.update({ valid: true, error: false, message: "Web Domain is valid"});
      return validation;
  }
}