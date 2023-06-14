import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect } from 'react'

import { useActions } from '../../hooks/useActions'
import { useAuth } from '../../hooks/useAuth'
import { getAccessToken, getRefreshToken } from '../../services/auth/auth.helper'

import { TypeComponentAuthFields } from './auth-page.types'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	children,
	Component: { isOnlyUser, isOnlyAdmin },
}) => {
	const { user } = useAuth()
	const { checkAuth, logout } = useActions()
	const { pathname } = useRouter()
	const Children = () => <>{children}</>
	useEffect(() => {
		const accessToken = getAccessToken()
		if (accessToken) {
			checkAuth()
		}
	}, []) //eslint-disable-line react-hooks/exhaustive-deps
	useEffect(() => {
		const refreshToken = getRefreshToken()
		if (!refreshToken && !user) {
			logout()
		}
	}, [pathname])
	return !isOnlyUser && !isOnlyUser ? (
		<Children />
	) : (
		<DynamicCheckRole Component={{ isOnlyUser, isOnlyAdmin }}>
			<Children />
		</DynamicCheckRole>
	)
}

export default AuthProvider
