import { Button, Form, Input, Typography } from 'antd'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/meta/Meta'

import { IEmailPassword } from '@/store/user/user.interface'

import styles from './Auth.module.scss'

const Login: FC = () => {
	// useAuthRedirect()
	const { isLoading } = useAuth()
	const { register, handleSubmit, formState, reset, control } = useForm<IEmailPassword>({
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
				<h3>Авторизация</h3>
				<Form
					style={{
						alignItems: 'start',
					}}
					onSubmitCapture={handleSubmit(onSubmit)}
				>
					<Form.Item label='Логин'>
						<Controller
							name='email'
							control={control}
							render={({ field }) => <Input {...field} placeholder='Логин' />}
						/>
					</Form.Item>

					<Form.Item label='Пароль'>
						<Controller
							name='password'
							control={control}
							render={({ field }) => <Input.Password {...field} placeholder='Пароль' />}
						/>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type='default' htmlType='submit'>
							Войти
						</Button>
					</Form.Item>
				</Form>
			</section>
		</Meta>
	)
}

export default Login
