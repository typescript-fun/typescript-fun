import { StyleSheet, Platform } from 'react-native';

const design = {
  fontFamily: {
    base:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  },
  color: {
    blue: '#3182ce',
    darkBlue: '#153e75',
    green: '#38a169',
    lightBlue: '#ceedff',
    lightGray: 'rgb(226, 232, 240)',
    red: '#e53e3e',
    text: '#1a202c',
    white: '#fff',
  },
  spacing: {
    small: 8,
    base: 16,
    big: 32,
    // smaller, smallest, bigger, biggest, whatever
  },
} as const;

export const theme = StyleSheet.create({
  rootScrollView: {
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
  containerCodesandbox: {
    paddingTop: design.spacing.base,
    flex: 1,
  },
  pageHeader: {
    marginBottom: 48,
    marginTop: design.spacing.big,
  },
  pageHeaderCodesandbox: {
    marginBottom: 48,
    marginTop: design.spacing.big,
    alignItems: 'center',
  },
  pageFooter: {
    marginTop: design.spacing.big,
  },
  logo: {
    height: 45,
    width: 300,
  },
  heading1: {
    color: design.color.text,
    fontFamily: design.fontFamily.base,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: design.spacing.big,
  },
  heading2: {
    color: design.color.text,
    fontFamily: design.fontFamily.base,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 25,
    marginBottom: design.spacing.base,
    marginTop: design.spacing.big,
  },
  heading3: {
    color: design.color.text,
    fontFamily: design.fontFamily.base,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: design.spacing.base,
    marginTop: design.spacing.big,
  },
  text: {
    color: design.color.text,
    fontFamily: design.fontFamily.base,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: design.spacing.base,
  },
  smallText: {
    color: design.color.text,
    fontFamily: design.fontFamily.base,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
  },
  bigText: {
    color: design.color.text,
    fontFamily: design.fontFamily.base,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 24,
  },
  link: {
    color: design.color.blue,
  },
  linkHover: {
    textDecorationLine: 'underline',
  },
  icon: {
    height: design.spacing.base,
    marginHorizontal: design.spacing.small,
    top: 2,
    width: design.spacing.base,
  },
  linkButton: {
    backgroundColor: design.color.blue,
    borderRadius: 4,
    color: design.color.white,
    fontWeight: '600',
    paddingHorizontal: design.spacing.base,
    paddingVertical: design.spacing.small,
  },
  linkButtonOutline: {
    borderColor: design.color.blue,
    borderRadius: 4,
    borderWidth: 1,
    fontWeight: '600',
    paddingHorizontal: design.spacing.base,
    paddingVertical: design.spacing.small,
  },
  tag: {
    backgroundColor: design.color.lightBlue,
    borderRadius: 64,
    color: design.color.darkBlue,
    fontWeight: '500',
    marginRight: design.spacing.small,
    padding: design.spacing.small,
    paddingRight: design.spacing.base,
  },
  tagImage: {
    borderRadius: 24,
    height: 24,
    marginRight: design.spacing.small,
    top: 6,
    width: 24,
  },
  bigMarginBottom: {
    marginBottom: design.spacing.big,
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
    paddingVertical: design.spacing.small,
    paddingHorizontal: design.spacing.base,
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
    lineHeight: 24,
    fontWeight: '500',
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
    backgroundColor: design.color.green,
    marginTop: design.spacing.base,
    borderRadius: 4,
    paddingVertical: design.spacing.small,
    alignItems: 'center',
    ...Platform.select({
      web: { outlineWidth: 0 },
    }),
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
    lineHeight: 24,
    fontWeight: '500',
  },
});
