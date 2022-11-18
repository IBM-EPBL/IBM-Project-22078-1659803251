import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: '\'Inter\', sans-serif',
    body: '\'Inter\', sans-serif',
  },
  styles: {
    global: () => ({
      body: {
        bg: '#1C1C1C',
        color: '#EDEDED',
      },
    }),
  },
});

export default theme;