const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 10, max: 300 }))
    errors.text = "A publicação deve ser de 10 a 300 caracteres";

  if (validator.isEmpty(data.text)) errors.text = "Este campo é obrigatório";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
