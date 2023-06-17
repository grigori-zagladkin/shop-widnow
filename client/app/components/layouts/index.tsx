import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box, Flex, HStack, IconButton, Stack, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import NavLink from '../NavLink'

import AdminLayout, { ILink } from './AdminLayout'
import Search from './Search'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const { asPath } = useRouter()
	const Links: ILink[] = [
		{
			title: 'Главная',
			link: '/',
		},
		{
			title: 'Каталог',
			link: '/categories',
		},
		{
			title: 'Доставка',
			link: '/delivery',
		},
		{
			title: 'Оплата',
			link: '/delivery',
		},
		{
			title: 'Контакты',
			link: '/delivery',
		},
	]

	if (asPath.includes('manage')) return <AdminLayout>{children}</AdminLayout>

	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			{!asPath.includes('manage') && (
				<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
					<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
						<IconButton
							size={'md'}
							icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
							aria-label={'Open Menu'}
							display={{ md: 'none' }}
							onClick={isOpen ? onClose : onOpen}
						/>
						<HStack spacing={8} alignItems={'center'}>
							<Box>Logo</Box>
							<HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
								{Links.map((link, idx) => (
									<NavLink key={idx} title={link.title} link={link.link} />
								))}
							</HStack>
						</HStack>
						<Flex alignItems={'center'}>
							<Search />
						</Flex>
					</Flex>

					{isOpen ? (
						<Box pb={4} display={{ md: 'none' }}>
							<Stack as={'nav'} spacing={4}>
								{Links.map((link, idx) => (
									<NavLink key={idx} title={link.title} link={link.link} />
								))}
							</Stack>
						</Box>
					) : null}
				</Box>
			)}

			<div className='min-h-full p-4 flex flex-col'>{children}</div>

			{!asPath.includes('manage') && <footer>Подвал</footer>}
		</>
	)
}

export default Layout
