import { FC, PropsWithChildren } from 'react'

const Subheading: FC<PropsWithChildren> = ({ children }) => {
	return <h2 className='text-xl text-black font-medium bg-green-400 py-1.5 px-2 w-fit rounded-lg'>{children}</h2>
}

export default Subheading
