# validate-model

Validate model objects with [validator.js](https://github.com/chriso/validator.js). Read validator.js documentation to see available validators.

## Installation

```npm install validate-model --save```

## Usage

```js
var ValidateModel = require('validate-model');
var validate = ValidateModel.validate;
var validateAll = ValidateModel.validateAll;

var UserValidators = {
  name: {
    title: 'Name',
    validate: [{
      validator: 'isLength',
      arguments: [1, 255],
    }]
  },
  email: {
    title: 'Email',
    validate: [{
      validator: 'isLength',
      arguments: [20, 255],
      message: '{TITLE} is too short'
    },
    {
      validator: 'isEmail',
      message: '{TITLE} must be valid'
    }]
  },
  password: {
    title: 'Password',
    validate: [{
      validator: 'isLength',
      arguments: [8, 255],
      message: '{TITLE} is too short'
    }]
  }
};

var user = {
  name: 'Foo',
  email: 'invalid@email',
  password: 'short'
};

var nameValidation = validate(UserValidators.name, user.name);
// { valid: true, messages: [] }

var emailValidation = validate(UserValidators.email, user.email);
// { valid: false, messages: ['Email is too short', 'Email must be valid'] }

var passwordValidation = validate(UserValidators.password, user.password);
// { valid: false, messages: ['Password is too short'] }

var userValidation = validateAll(UserValidators, user)
// { valid: false, messages: {email: ['Email is too short', 'Email must be valid'], password: ['Password is too short']}}

```

## Inspiration

This package is inspired by the way [FaridSafi/react-native-gifted-form](https://github.com/FaridSafi/react-native-gifted-form) implements form validation.

## Contributing

Please create issues and send pull requests!

## License

[MIT](LICENSE)
