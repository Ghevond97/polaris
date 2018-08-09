const signUpValidate = values => {
  const errors = {};
  const requiredFields = [
    'username',
    'email',
    'password',
    'passwordConformation',
  ];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = `${field.charAt(0).toUpperCase() +
        field.slice(1)} is required!`;
    }

    if (
      field === 'email' &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[field])
    ) {
      errors[field] = 'Must be a valid email';
    }

    if (field === 'passwordConformation' && field !== requiredFields[2]) {
      errors[field] = 'Passwords do not match!';
    }

    if (values[field] && values[field].length < 5) {
      errors[field] = 'Your input must contain more than 5 symbols!';
    }
  });

  return errors;
};

export default signUpValidate;
