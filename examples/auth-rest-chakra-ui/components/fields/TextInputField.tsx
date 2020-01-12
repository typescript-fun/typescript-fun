import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/core';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import React, {
  FormEventHandler,
  FC,
  KeyboardEventHandler,
  ReactNode,
  useCallback,
} from 'react';
import { FieldMaybeOptional, isOptionalField } from '../../hooks/useForm';
import { FormErrorID, FormErrorMessage } from '../FormErrorMessage';

export const TextInputField: FC<{
  field: FieldMaybeOptional<string, FormErrorID>;
  icon?: ReactNode;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel';
}> = ({ field, icon, label, type, ...rest }) => {
  const handleChange = useCallback<FormEventHandler<HTMLInputElement>>(
    ({ currentTarget: { value } }) => {
      if (isOptionalField(field)) {
        field.onChange(value.length === 0 ? O.none : O.some(value));
      } else {
        field.onChange(value);
      }
    },
    [field],
  );

  const handleKeyPress = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    event => {
      if (event.key === 'Enter') field.submit();
    },
    [field],
  );

  const value = isOptionalField(field)
    ? pipe(
        field.value,
        O.getOrElse(() => ''),
      )
    : field.value;

  const input = (
    <Input
      id={field.key}
      type={type}
      value={value}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      ref={field.ref}
    />
  );

  return (
    <FormControl
      isRequired={!isOptionalField(field)}
      isInvalid={field.isInvalid}
      {...rest}
    >
      <FormLabel htmlFor={field.key}>{label}</FormLabel>
      {icon ? (
        <InputGroup>
          <InputLeftElement>{icon}</InputLeftElement>
          {input}
        </InputGroup>
      ) : (
        input
      )}
      <FormErrorMessage error={field.firstError} />
    </FormControl>
  );
};
