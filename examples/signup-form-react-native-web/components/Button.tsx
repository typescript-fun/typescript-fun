import React, { FC, useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useFocus } from '../hooks/useFocus';
import { useTheme } from '../hooks/useTheme';

export const Button: FC<{
  label: string;
  disabled?: boolean;
  onPress: () => void;
}> = ({ label, disabled, onPress }) => {
  const theme = useTheme();
  const [hasFocus, focusProps] = useFocus();
  const handlePress = useCallback(() => {
    // We do not use disabled prop, because it disables also focus and blur events.
    if (!disabled) onPress();
  }, [disabled, onPress]);

  return (
    <TouchableOpacity
      {...focusProps}
      accessibilityRole="button"
      style={[
        theme.button,
        hasFocus && theme.buttonFocus,
        disabled && theme.buttonDisabled,
      ]}
      onPress={handlePress}
    >
      <Text style={theme.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};
