import type { AppProps } from 'next/app'
import App from 'next/app'
import MainProvider from 'provider/MainProvider'
import { TypeComponentAuthFields } from 'provider/authProvider/auth-page.types'

import '@/assets/styles/globals.scss'

type TypeAppProps = AppProps & TypeComponentAuthFields

const MyApp = ({ Component, pageProps }: TypeAppProps) => (
	<MainProvider Component={Component}>
		<Component {...pageProps} />
	</MainProvider>
)

MyApp.getInitialProps = async (appContext: any) => {
	const appProps = await App.getInitialProps(appContext)
	return { ...appProps }
}

export default MyApp
