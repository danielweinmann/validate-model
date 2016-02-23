var validatorjs = require('validator');

var validate = (function() {

  return function validate(validator, value) {
    if(!validator) throw new Error("Must pass validator parameter");
    if(!validator.validate) throw new Error("Validator must have validate attribute");
    if(!Array.isArray(validator.validate)) throw new Error("Validator validate attribute must be an Array");

    var valid = true;
    var validate = validator.validate;
    var result = {
      valid: true,
      messages: []
    };

    for (var i = 0; i < validate.length; i++) {
      if (validate[i].validator === 'undefined') { continue; }

      var args = validate[i].arguments;
      args = !Array.isArray(args) ? [args] : args;
      var clonedArgs = args.slice(0);
      clonedArgs.unshift(value || '');

      var message = validate[i].message || '';
  
      var title = validator.title;
      if (title) {
        message = message.replace('{TITLE}', title);            
      }
    
      message = message.replace(/{ARGS\[(\d+)\]}/g, function (replace, argIndex) {
        var val = args[argIndex];
        return val !== undefined ? val : '';
      });
    
      if (typeof validate[i].validator === 'function') {
        valid = validate[i].validator.apply(null, clonedArgs);
        if(!valid) {
          result.valid = false
          result.messages.push(message)  
        }
      } else {
        if (typeof validatorjs[validate[i].validator] === 'undefined') {
          console.warn('validate-model error: validator is not correct for: ' + validator);
          continue;
        }
        
        if (validate[i].validator === 'isLength') {
          if (typeof clonedArgs[0] === 'string') {
            clonedArgs[0] = clonedArgs[0].trim();
          }
        }
        
        valid = validatorjs[validate[i].validator].apply(null, clonedArgs);
        if(!valid) {
          result.valid = false
          result.messages.push(message)  
        }
      }
    }
    return result;
  }
})();

var validateAll = (function() {

  return function validateAll(validators, model) {
    var result = {
      valid: true,
      messages: {}
    };
    for(var attribute in validators) {
      var validation = validate(validators[attribute], model[attribute])
      if (!validation.valid) {
        result.valid = false;
        result.messages[attribute] = validation.messages;
      }
    }
    return result;
  }

})();

var validateFunction = (function() {

  return function validateFunction(validators) {
    return function validate(values) {
      var validation = validateAll(validators, values);
      if (!validation.valid) return validation.messages;
      return {};
    }
  }

})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validate: validate,
    validateAll: validateAll,
    validateFunction: validateFunction
  };
}
