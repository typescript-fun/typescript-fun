import { StyleSheet } from 'react-native';

// That's all we need for a "design system".
// We don't even need constants. Just find and replace what has to be changed.
// For example, `16` or `padding: 16`. I suppose this is the best DX.
// Note we can compose styles via `StyleSheet.compose`.

export const theme = StyleSheet.create({
  container: {
    backgroundColor: '#cccccc',
    marginHorizontal: 'auto',
    maxWidth: 740,
    padding: 16,
    width: '100%',
  },
});
