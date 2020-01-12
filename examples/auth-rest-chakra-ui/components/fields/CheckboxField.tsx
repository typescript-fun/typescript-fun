import { Checkbox, FormControl } from '@chakra-ui/core';
import React, {
  FormEventHandler,
  FC,
  KeyboardEventHandler,
  useCallback,
} from 'react';
import { Field } from '../../hooks/useForm';
import { FormErrorID } from '../FormErrorMessage';

export const CheckboxField: FC<{
  field: Field<boolean, FormErrorID>;
  label: string;
}> = ({ field, label, ...rest }) => {
  const handleChange = useCallback<FormEventHandler<HTMLInputElement>>(
    event => {
      field.onChange(event.currentTarget.checked);
    },
    [field],
  );

  const handleKeyPress = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    event => {
      if (event.key === 'Enter') field.submit();
    },
    [field],
  );

  return (
    <FormControl {...rest}>
      <Checkbox
        isChecked={field.value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        ref={field.ref}
      >
        {label}
      </Checkbox>
    </FormControl>
  );
};
