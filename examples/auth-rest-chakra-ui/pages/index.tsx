import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Text, Link, Button } from '@chakra-ui/core';

const Index = () => {
  return (
    <>
      <Head>
        <title>Typed Functional Programming in Typescript Example</title>
      </Head>
      <Box m={8}>
        <Text fontSize="xl">
          Typed Functional Programming in Typescript Example
        </Text>
        <Box maxW="sm" borderWidth="1px" rounded="lg" p={4} my={4}>
          {/* login or sign up. */}
          <Text fontSize="lg">
            You can{' '}
            <NextLink href={{ pathname: '/login' }}>
              <Link color="teal.500">login</Link>
            </NextLink>{' '}
            or{' '}
            <NextLink href={{ pathname: '/signup' }}>
              <Link color="teal.500">sign up</Link>
            </NextLink>
            .
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Index;
