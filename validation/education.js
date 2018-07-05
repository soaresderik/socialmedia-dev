const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school))
    errors.school = "Este campo é obrigatório";
  if (validator.isEmpty(data.degree))
    errors.degree = "Este campo é obrigatório";
  if (validator.isEmpty(data.fieldofstudy))
    errors.fieldofstudy = "Este campo é obrigatório";
  if (validator.isEmpty(data.from)) errors.from = "Este campo é obrigatório";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
