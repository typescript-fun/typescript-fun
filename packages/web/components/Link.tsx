import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React, { FC } from 'react';
import { Platform, Text, TextProps, View } from 'react-native';
import { ExternalUrl, Url } from '../types';
import { useTheme } from '../hooks/useTheme';
import { Hoverable } from 'typescript-fun';

type LinkProps = NextLinkProps &
  TextProps & {
    href: Url;
    icon?: boolean;
  };

const ExternalUrlIcon: FC = () => {
  const theme = useTheme();
  return (
    <View style={theme.icon}>
      <svg viewBox="0 0 24 24" focusable="false" role="presentation">
        <g
          fill="none"
          stroke="currentColor"
          // strokeLinecap="full"
          strokeWidth="2"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <path d="M15 3h6v6"></path>
          <path d="M10 14L21 3"></path>
        </g>
      </svg>
    </View>
  );
};

export const Link: FC<LinkProps> = props => {
  const theme = useTheme();
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
    children,
    icon,
    ...textProps
  } = props;

  const isExternal = ExternalUrl.is(href);

  const link = (
    <Text
      {...textProps}
      {...(isExternal && Platform.select({ web: { href, target: '_blank' } }))}
      accessibilityRole="link"
      style={[theme.link, textProps.style as any]}
    >
      <Hoverable>
        {hover => (
          // Additional Text is necessary. NextLink injects own props to its first child
          // which clashes with Hoverable props, because Hoverable has own props.
          // Why all of this? We want Hoverable, because it fixes hover on touch / mobile
          // devices. Necolas is already working on the better API.
          <Text style={hover && theme.linkHover}>
            {children}
            {icon && isExternal && <ExternalUrlIcon />}
          </Text>
        )}
      </Hoverable>
    </Text>
  );

  if (isExternal) return link;

  return (
    <NextLink
      href={href}
      passHref={true}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      {link}
    </NextLink>
  );
};
