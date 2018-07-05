const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle precisa ter entre 2 a 4 caracteres";
  }

  if (validator.isEmpty(data.handle))
    errors.handle = "Profile Handle é Obrigatório";

  if (validator.isEmpty(data.status))
    errors.status = "Campo Status é Obrigatório";

  if (validator.isEmpty(data.skills))
    errors.skills = "Campo habilidades é Obrigatório";

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "A url não é válida";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "A url não é válida";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "A url não é válida";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "A url não é válida";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "A url não é válida";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "A url não é válida";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
