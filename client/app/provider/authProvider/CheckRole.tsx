import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { TypeComponentAuthFields } from './auth-page.types'

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	Component: { isOnlyUser, isOnlyAdmin },
	children,
}) => {
	const { user } = useAuth()
	const router = useRouter()
	const Children = () => <>{children}</>
	const isAdmin = user?.role === 'ADMIN'
	const isUser = user && !isAdmin
	if (!isOnlyAdmin && !isOnlyUser) {
		return <Children />
	}
	if (isOnlyAdmin) {
		router.pathname !== '/404' && router.replace('/404')
		return null
	}
	if (user && isOnlyUser) {
		return <Children />
	} else {
		router.pathname !== 'auth' && router.replace('/auth')
		return null
	}
}

export default CheckRole
