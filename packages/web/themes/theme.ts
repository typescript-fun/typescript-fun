import { StyleSheet } from 'react-native';

const _ = {
  fontFamily: {
    base:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  },
  color: {
    text: 'rgb(26, 32, 44)',
    link: 'rgb(49, 130, 206)',
  },
  spacing: {
    smaller: 8,
    base: 16,
    bigger: 32,
    // smallest, biggest, superSmall, whatever
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
    padding: _.spacing.base,
  },
  pageHeader: {
    marginBottom: 48,
    marginTop: _.spacing.bigger,
  },
  logo: {
    height: 45,
    width: 300,
  },
  heading1: {
    color: _.color.text,
    fontFamily: _.fontFamily.base,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: _.spacing.bigger,
  },
  heading2: {
    color: _.color.text,
    fontFamily: _.fontFamily.base,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 25,
    marginBottom: _.spacing.base,
  },
  paragraph: {
    color: _.color.text,
    fontFamily: _.fontFamily.base,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: _.spacing.base,
  },
  link: {
    color: _.color.link,
  },
  linkHover: {
    textDecorationLine: 'underline',
  },
  icon: {
    width: _.spacing.base,
    height: _.spacing.base,
    marginHorizontal: _.spacing.smaller,
    top: 2,
  },
});
