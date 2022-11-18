import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import theme from './utils/theme'

import '@fontsource/inter/100.css'
import '@fontsource/inter/200.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/900.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </RecoilRoot>
)
