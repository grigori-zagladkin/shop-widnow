import { Button } from '@chakra-ui/react'
import clsx from 'clsx'
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

const MyButton: FC<PropsWithChildren<IButton>> = ({ children, className, ...rest }) => {
	return (
		<Button
			{...rest}
			className={clsx(
				'rounded-xl font-medium shadow px-10 py-2 hover:shadow-lg transition duration-300 ease-in-out',
				className,
			)}
		>
			{children}
		</Button>
	)
}

export default MyButton
