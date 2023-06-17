import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HeadProvider from 'provider/HeadProvider'
import ReduxToast from 'provider/ReduxToast'
import AuthProvider from 'provider/authProvider'
import { TypeComponentAuthFields } from 'provider/authProvider/auth-page.types'
import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import Layout from '@/components/layouts'

import ErrorBoundary from '@/utils/error-boundary'

import { setupStore } from '@/store/index'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const store = setupStore()

const MainProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({ children, Component }) => (
	<ErrorBoundary>
		<ChakraProvider>
			<HeadProvider>
				<QueryClientProvider client={queryClient}>
					<Provider store={store}>
						<AuthProvider Component={Component}>
							<ReduxToast />
							<Layout>{children}</Layout>
						</AuthProvider>
					</Provider>
				</QueryClientProvider>
			</HeadProvider>
		</ChakraProvider>
	</ErrorBoundary>
)

export default MainProvider
