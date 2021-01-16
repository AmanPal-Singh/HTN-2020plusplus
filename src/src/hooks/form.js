import { useState } from 'react';

const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);

  // when changed, set username/password accordingly
  const onChange = id => event => {
    const val = event.target.value;
    setValues(oldValues => {
      return {
        ...oldValues,
        [id]: val,
      };
    });
  };

  return [values, onChange];
};

export default useForm;
