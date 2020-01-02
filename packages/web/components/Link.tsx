import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React, { FC } from 'react';
import { Platform, Text, TextProps } from 'react-native';
import { ExternalUrl, Url } from '../types';

type LinkProps = NextLinkProps & TextProps & { href: Url };

export const Link: FC<LinkProps> = props => {
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

  if (ExternalUrl.is(href))
    return (
      <Text
        {...textProps}
        accessibilityRole="link"
        // web-only properties.
        {...Platform.select({
          web: { href, target: '_blank' },
        })}
      />
    );

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
