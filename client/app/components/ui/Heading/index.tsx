import { FC, PropsWithChildren } from 'react'

const Heading: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
	return <h1 className={`${className}`}>{children}</h1>
}

export default Heading
