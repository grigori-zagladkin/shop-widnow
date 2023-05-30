import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Heading from '@/components/ui/Heading'
import Button from '@/components/ui/form-elements/Button'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/meta/Meta'

import { IEmailPassword } from '@/store/user/user.interface'

import styles from './Auth.module.scss'
import AuthFields from './AuthFields'
import { useAuthRedirect } from './useAuthRedirect'

const Login: FC = () => {
	useAuthRedirect()
	const { isLoading } = useAuth()
	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<IEmailPassword>({
		mode: 'onChange',
	})
	const { login } = useActions()
	const onSubmit: SubmitHandler<IEmailPassword> = (data) => {
		login(data)
		reset()
	}
	return (
		<Meta title='Авторизация'>
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading>Авторизация</Heading>
					<AuthFields formState={formState} register={registerInput} isPasswordRequired={true} />
					<Button>Войти</Button>
				</form>
			</section>
		</Meta>
	)
}

export default Login
