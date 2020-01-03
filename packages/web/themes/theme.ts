import { StyleSheet } from 'react-native';

const design = {
  fontFamily: {
    base:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  },
  color: {
    text: 'rgb(26, 32, 44)',
    darkBlue: '#153e75',
    blue: 'rgb(49, 130, 206)',
    lightBlue: '#ceedff',
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
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  container: {
    marginHorizontal: 'auto',
    maxWidth: 740,
    width: '100%',
    padding: design.spacing.base,
  },
  pageHeader: {
    marginBottom: 48,
    marginTop: design.spacing.big,
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
    marginTop: design.spacing.big,
    marginBottom: design.spacing.base,
  },
  paragraph: {
    color: design.color.text,
    fontFamily: design.fontFamily.base,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: design.spacing.base,
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
  buttonOutline: {
    borderColor: design.color.blue,
    borderRadius: 4,
    borderWidth: 1,
    fontWeight: '600',
    paddingHorizontal: design.spacing.base,
    paddingVertical: design.spacing.small,
  },
  tag: {
    backgroundColor: design.color.lightBlue,
    color: design.color.darkBlue,
    fontWeight: '500',
    padding: design.spacing.small,
    borderRadius: 64,
    paddingRight: design.spacing.base,
    marginRight: design.spacing.small,
  },
  tagImage: {
    width: 24,
    height: 24,
    borderRadius: 24,
    top: 6,
    marginRight: design.spacing.small,
  },
});
