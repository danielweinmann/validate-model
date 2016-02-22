var validate = (function() {

  return function validate(validator, attribute) {
    return {
      valid: true,
      messages: null
    };
  }

})();

var validateAll = (function() {

  return function validateAll(validators, model) {
    return {
      valid: true,
      messages: null
    };
  }

})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validate: validate,
    validateAll: validateAll
  };
}
