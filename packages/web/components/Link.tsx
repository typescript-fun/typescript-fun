import NextLink, { LinkProps } from 'next/link';
import React, { FC } from 'react';
import { Text, TextProps } from 'react-native';

export const Link: FC<LinkProps & TextProps> = props => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    as,
    href,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    passHref,
    prefetch,
    replace,
    scroll,
    shallow,
    ...textProps
  } = props;

  return (
    <NextLink
      href={href}
      passHref={true}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <Text accessibilityRole="link" {...textProps} />
    </NextLink>
  );
};
