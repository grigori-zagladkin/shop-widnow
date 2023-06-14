import { Link } from '@chakra-ui/next-js'
import { useColorModeValue } from '@chakra-ui/react'
import { FC } from 'react'

import { ILink } from './layouts/AdminLayout'

const NavLink: FC<ILink> = ({ title, link }) => {
	return (
		<Link
			px={2}
			py={1}
			rounded={'md'}
			_hover={{
				textDecoration: 'none',
				bg: useColorModeValue('gray.200', 'gray.700'),
			}}
			href={link}
		>
			{title}
		</Link>
	)
}

export default NavLink
