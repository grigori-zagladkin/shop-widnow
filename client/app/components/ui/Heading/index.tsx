import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'

import styles from './Heading.module.scss'

const Heading: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
	return <h1 className={clsx(styles.heading, className)}>{children}</h1>
}

export default Heading
