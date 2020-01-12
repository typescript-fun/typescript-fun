import { useCallback, useMemo, useState } from 'react';

export const useFocus = () => {
  const [hasFocus, setHasFocus] = useState(false);
  const handleFocus = useCallback(() => {
    setHasFocus(true);
  }, []);
  const handleBlur = useCallback(() => {
    setHasFocus(false);
  }, []);
  const focusProps = useMemo(
    () => ({
      onFocus: handleFocus,
      onBlur: handleBlur,
    }),
    [handleBlur, handleFocus],
  );
  return [hasFocus, focusProps];
};
