import { FC, Fragment } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import Field from '@/components/ui/form-elements/Field'

import { IEmailPassword } from '@/store/user/user.interface'

interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<IEmailPassword>
	isPasswordRequired?: boolean
}

export const validEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const AuthFields: FC<IAuthFields> = ({ register, formState: { errors }, isPasswordRequired = false }) => {
	return (
		<Fragment>
			<Field
				{...register('email', {
					required: 'Введите почту',
					pattern: {
						value: validEmail,
						message: 'Введите корректную почту',
					},
				})}
				placeholder='Логин'
				error={errors.email}
			/>
			<Field
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Введите пароль',
								minLength: {
									value: 6,
									message: 'Min length should more 6 symbols',
								},
						  }
						: {},
				)}
				type='password'
				placeholder='Пароль'
				error={errors.password}
			/>
		</Fragment>
	)
}

export default AuthFields
