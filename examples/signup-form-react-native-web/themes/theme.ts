import { StyleSheet, Platform } from 'react-native';

const design = {
  fontFamily: {
    base:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  },
  color: {
    blue: '#3182ce',
    green: '#38a169',
    lightGray: 'rgb(226, 232, 240)',
    red: '#e53e3e',
    text: '#1a202c',
    white: '#fff',
  },
  spacing: {
    small: 8,
    base: 16,
    big: 32,
  },
} as const;

export const theme = StyleSheet.create({
  scrollView: {
    flex: 1,
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
  },
  container: {
    marginHorizontal: 'auto',
    maxWidth: 740,
    padding: design.spacing.base,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  form: {
    borderColor: design.color.lightGray,
    borderRadius: design.spacing.small,
    borderWidth: 1,
    padding: design.spacing.base,
    width: design.spacing.small * 42,
  },
  textInput: {
    borderColor: design.color.lightGray,
    borderRadius: design.spacing.small,
    borderWidth: 1,
    color: design.color.text,
    fontFamily: design.fontFamily.base,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: design.spacing.base,
    outlineWidth: 0,
    paddingHorizontal: design.spacing.base,
    paddingVertical: design.spacing.small,
  },
  textInputInvalid: {
    marginBottom: design.spacing.small,
  },
  textInputFocus: {
    borderColor: design.color.blue,
    boxShadow: `0 0 0 1px ${design.color.blue}`,
  },
  textInputLabel: {
    color: design.color.text,
    fontFamily: design.fontFamily.base,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: design.spacing.small,
  },
  textInputIsRequiredAsterisk: {
    color: design.color.red,
    fontFamily: design.fontFamily.base,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  formErrorMessage: {
    color: design.color.red,
    fontFamily: design.fontFamily.base,
    fontSize: 14,
    lineHeight: 24,
    marginBottom: design.spacing.small,
    position: 'relative',
    top: -design.spacing.small,
  },
  checkBox: {
    alignSelf: 'center',
    color: design.color.blue,
  },
  checkBoxFocus: {
    borderRadius: 2,
    boxShadow: `0 0 0 2px ${design.color.blue}`,
  },
  checkBoxLabel: {
    color: design.color.text,
    fontFamily: design.fontFamily.base,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: design.spacing.small,
  },
  button: {
    alignItems: 'center',
    backgroundColor: design.color.green,
    borderRadius: 4,
    marginTop: design.spacing.base,
    outlineWidth: 0,
    paddingVertical: design.spacing.small,
  },
  buttonFocus: {
    ...Platform.select({
      web: { boxShadow: `0 0 0 2px ${design.color.blue}` },
    }),
  },
  buttonDisabled: {
    backgroundColor: design.color.lightGray,
  },
  buttonText: {
    color: design.color.white,
    fontFamily: design.fontFamily.base,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
});
