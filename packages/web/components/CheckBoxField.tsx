import React, { FC, useMemo } from 'react';
import { CheckBox, Platform, StyleSheet, Text, View } from 'react-native';
import { Field } from 'typescript-fun/src';
import { useTheme } from '../hooks/useTheme';
import { FieldErrorType } from './FieldErrorMessage';
import { useFocus } from '../hooks/useFocus';

export const CheckBoxField: FC<{
  field: Field<boolean, FieldErrorType>;
  label: string;
}> = ({ field, label }) => {
  const theme = useTheme();
  const [hasFocus, focusProps] = useFocus();
  const { color, ...style } = useMemo(
    () => StyleSheet.flatten(theme.checkBox),
    [theme.checkBox],
  );
  return (
    <View style={theme.row}>
      <CheckBox
        {...focusProps}
        {...Platform.select({ web: { color } })}
        value={field.value}
        onValueChange={field.onChange}
        style={[style, hasFocus && theme.checkBoxFocus]}
      />
      <Text style={theme.checkBoxLabel}>{label}</Text>
    </View>
  );
};
