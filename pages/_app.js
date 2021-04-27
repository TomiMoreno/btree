import '../styles/globals.css'
import {AppContextProvider} from '../components/Context'

function MyApp({ Component, pageProps }) {
  return <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
}

export default MyApp
