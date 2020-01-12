import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import React, { FC, useCallback } from 'react';
import { Text, TextInput, View } from 'react-native';
import { FieldMaybeOptional, isOptionalField } from 'typescript-fun';
import { useFocus } from '../hooks/useFocus';
import { useTheme } from '../hooks/useTheme';
import { FieldErrorMessage, FieldErrorType } from './FieldErrorMessage';

export const TextInputField: FC<{
  // A field can be Field, OptionalField or FieldMaybeOptional.
  // It's generic type. First arg is "output" type, the second is error type.
  field: FieldMaybeOptional<string, FieldErrorType>;
  label: string;
  secureTextEntry?: boolean;
}> = ({ field, label, secureTextEntry }) => {
  const theme = useTheme();
  const [hasFocus, focusProps] = useFocus();

  const value = isOptionalField(field)
    ? pipe(
        field.value,
        O.getOrElse(() => ''),
      )
    : field.value;

  const handleChangeText = useCallback(
    (value: string) => {
      if (isOptionalField(field)) {
        field.onChange(value.length === 0 ? O.none : O.some(value));
      } else {
        field.onChange(value);
      }
    },
    [field],
  );

  const handleSubmitEditing = useCallback(
    () => {
      field.submit();
    },
    [field],
  );

  return (
    <View>
      <View style={theme.row}>
        <Text style={theme.textInputLabel}>{label}</Text>
        {!isOptionalField(field) && (
          <Text style={theme.textInputIsRequiredAsterisk}> *</Text>
        )}
      </View>
      <TextInput
        {...focusProps}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing}
        style={[
          theme.textInput,
          hasFocus && theme.textInputFocus,
          field.isInvalid && theme.textInputInvalid,
        ]}
        value={value}
        secureTextEntry={secureTextEntry}
        blurOnSubmit={false}
        ref={field.ref}
      />
      <FieldErrorMessage error={field.firstError} />
    </View>
  );
};
