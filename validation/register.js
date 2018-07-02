const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "O nome deve está entre 2 a 30 caracteres";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "O nome é obrigatório";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "O Email é obrigatório";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "O Email informado é inválido";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "A senha é obrigatória";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "A senha deve ser maior que 6 caracteres";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "A senha deve ser confirmada";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "As senhas não correspondem";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
