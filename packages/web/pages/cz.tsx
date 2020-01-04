import { NextPage } from 'next';
import React from 'react';
import { Text } from 'react-native';
import { CourseOutline } from '../components/CourseOutline';
import { Link } from '../components/Link';
import { Page } from '../components/Page';
import { useTheme } from '../hooks/useTheme';

const Index: NextPage = () => {
  const theme = useTheme();
  return (
    <Page title="Školení funkcionálního programování v TypeScriptu od Daniela Steigerwalda">
      <Text style={theme.heading1}>
        Školení funkcionálního programování v TypeScriptu od Daniela
        Steigerwalda
      </Text>
      <Text style={theme.heading2}>Proč</Text>
      <Text style={theme.text}>
        Funkcionální programování je skoro jako jednorožec. Každý ví, jak takový
        jednorožec vypadá, ale doopravdy ho neviděl nikdo. Píšu skoro, protože
        funkcionální programování není jednorožec. Jednorožec je bájný tvor
        považovaný za symbol síly, čistoty, a krásy. Funkcionální programování
        není bájné, ne nutně.
      </Text>
      <Text style={theme.text}>
        Funkcionální programování je mentální model, který umožňuje psát
        aplikace rychleji, zábavněji, a s menším počtem chyb. Jakékoliv aplikace
        včetně těch nudných firemních. To je celkem odvážné tvrzení, a leckdo by
        mohl argumentovat, že špatný programátor prasí ve všem, zatímco dobrý
        programátor píše krásný kód v čemkoliv. Může být, ale je důvod, proč už
        nepíšeme běžné aplikace v assembleru ani v C.
      </Text>
      <Text style={theme.text}>
        Funkcionální programování je jiné, a na začátek se může zdát matoucí a
        nebude zřejmé, proč by měl člověk investovat svůj čas do něčeho
        takového. Proto je dobré začít postupně s praktickými příklady. Záhy
        však všechno začne dávat veliký smysl, a člověk už nebude chtít zpět. To
        vám garantuji, nebo vám vrátím peníze zpět.
      </Text>
      <Text style={theme.heading2}>Obsah školení</Text>
      <Text style={theme.text}>
        Smyslem školení je zreplikovat cestu, kterou jsem se funkcionální
        programování učil já, avšak bez odboček a bloudění. Informací na
        internetu je spousta, ale převážně pro jiné jazyky než je TypeScript.
      </Text>
      <CourseOutline />
      <Text style={theme.heading2}>Termíny a cena</Text>
      <Text style={theme.text}>
        Školení trvá dva dny. Začíná 9:30 a končí v 17:30. V ceně školení je
        možnost pozdější konzultace.
      </Text>
      <Text style={theme.heading2}>Registrace a Kontakt</Text>
      <Text style={theme.text}>
        Pokud máte zájem o školení nebo otázky, pište. Lze domluvit i
        individuální firemní školení. Hodinová sazba je 6 000 Kč.
      </Text>
      <Text style={theme.text}>
        <Link href="mailto:daniel@steigerwald.cz">daniel@steigerwald.cz</Link>
      </Text>
    </Page>
  );
};

export default Index;
