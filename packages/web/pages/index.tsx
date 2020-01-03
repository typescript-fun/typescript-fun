import { NextPage } from 'next';
import React from 'react';
import { Text, Image } from 'react-native';
import { Link } from '../components/Link';
import { Page } from '../components/Page';
import { useTheme } from '../hooks/useTheme';

const Index: NextPage = () => {
  const theme = useTheme();
  return (
    <Page title="TypeScript.fun - Typed Functional Programming in TypeScript Training">
      <Text style={theme.heading1}>
        Typed Functional Programming in Typescript
      </Text>
      <Text style={theme.heading2}>Why</Text>
      <Text style={theme.paragraph}>
        Typed functional programming in TypeScript is a game-changer for many
        reasons.
      </Text>
      <Text style={theme.paragraph}>
        But instead of a long and tedious explanation of why we created a
        five-minutes-demo for you. A form with browser and server validation.
        Until we write a blog post, explore the well-commented code.
      </Text>
      <Text style={theme.paragraph}>
        <Link
          style={theme.buttonOutline}
          href="https://github.com/typescript-fun/five-minutes-demo"
          icon
        >
          Example code on GitHub
        </Link>
      </Text>
      <Text style={theme.heading2}>Quick Introduction</Text>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/UwCLmHQOWoY"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
      ></iframe>
      <Text style={theme.heading2}>Other Resources</Text>
      <Text style={theme.paragraph}>
        <Link href="https://www.youtube.com/watch?v=PLFl95c-IiU" icon>
          Scott Wlaschin - Talk Session: Domain Modeling Made Functional
        </Link>
      </Text>
      <Text style={theme.paragraph}>
        <Link href="https://vimeo.com/97344498" icon>
          Scott Wlaschin - Railway Oriented Programming
        </Link>
      </Text>
      <Text style={theme.paragraph}>
        <Link href="https://www.youtube.com/watch?v=cxs7oLGrxQ4&t=39m9s" icon>
          Mark Seemann - From Dependency injection to dependency rejection
        </Link>
      </Text>
      <Text style={theme.heading2}>Course Description</Text>
      <Text style={theme.paragraph}>
        During the one-day workshop, you’ll learn how to create a bullet-proof
        aplications that run either on client or on server. This course is very
        hands-on, and you will be able to practice everything you learn.
      </Text>
      <Text style={theme.heading2}>Course Outline</Text>
      <Text style={theme.paragraph}>
        1. Basic functional programming: immutability, pure functions, map and
        reduce.
      </Text>
      <Text style={theme.paragraph}>
        2. Domain modeling made functional with algebraic types.
      </Text>
      <Text style={theme.paragraph}>
        3. How to never use null nor undefined again.
      </Text>
      <Text style={theme.paragraph}>
        4. Basic fp-ts: interfaces, pipe, Eq, Ord, Option, Either.
      </Text>
      <Text style={theme.paragraph}>
        5. How to reliably validate data with io-ts.
      </Text>
      <Text style={theme.paragraph}>
        6. Advanced TypeScript: currying, advanced types, useful tips.
      </Text>
      <Text style={theme.paragraph}>
        7. Advanced fp-ts structures and patterns.
      </Text>
      <Text style={theme.heading2}>Next Dates</Text>
      <Text style={theme.heading2}>Skill Requirements</Text>
      <Text style={theme.paragraph}>1. Basic JavaScript knowledge</Text>
      <Text style={theme.paragraph}>
        2. Basic experience with TypeScript or Flow
      </Text>
      <Text style={theme.heading2}>Who Is behind the Workshop?</Text>
      <Text style={theme.paragraph}>
        <Link style={theme.tag} href="https://twitter.com/steida">
          <Image
            style={theme.tagImage}
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/1051527634130210821/V4hqy3A9_reasonably_small.jpg',
            }}
          />
          Daniel Steigerwald
        </Link>
        <Link style={theme.tag} href="https://twitter.com/robinpokorny">
          <Image
            style={theme.tagImage}
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/1001729903392411648/sOCR656e_reasonably_small.jpg',
            }}
          />
          Robin Pokorny
        </Link>
      </Text>
    </Page>
  );
};

export default Index;
