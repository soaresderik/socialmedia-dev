const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "O Email informado é inválido";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "O Email é obrigatório";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "A senha é obrigatória";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
