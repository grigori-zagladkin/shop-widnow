import { ChevronRightIcon } from '@chakra-ui/icons'
import { FC, PropsWithChildren } from 'react'

const Subheading: FC<PropsWithChildren> = ({ children }) => {
	return (
		<h2 className='text-2xl cursor-pointer hover:text-slate-500 text-black font-semibold w-fit'>
			{children} <ChevronRightIcon />
		</h2>
	)
}

export default Subheading
