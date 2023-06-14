import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box, Flex, HStack, IconButton, Stack, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'

import NavLink from '../NavLink'

import { ILink } from './AdminLayout'
import Search from './Search'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	// return (
	// <div className={styles.wrapper}>
	// 	<header className={styles.header}>
	// 		<div>
	// 			<Link href={'/'} className={styles.logo}>
	// 				<Image src={logo} width={95} height={40} alt='логотип' />
	// 			</Link>
	// 			<Link href={'/categories'} className={clsx(styles.catalog, styles.hoverItem)}>
	// 				Каталог <MaterialIcon name='MdListAlt' />
	// 			</Link>
	// 			<Search />
	// 			<Link href='/delivery' className={styles.hoverItem}>
	// 				Доставка
	// 			</Link>
	// 			<Link href='/payment' className={styles.hoverItem}>
	// 				Оплата
	// 			</Link>
	// 			<Link href='/contacts' className={styles.hoverItem}>
	// 				Контакты
	// 			</Link>
	// 			<a href='tel:+79999999999' className={styles.phoneLink}>
	// 				<MaterialIcon name='MdPhone' /> +79999999999
	// 			</a>
	// 		</div>
	// 	</header>
	// 	<div className={styles.content}>{children}</div>
	// 	<footer className={styles.footer}>
	// 		<div className={styles.footerTop}>
	// 			<div className={styles.footerContacts}>
	// 				<div className={styles.footerContactsTitle}>
	// 					<h3>What's up</h3>
	// 					<a href='tel:+79922453710'>+79922453710</a>
	// 					<h3>Номер телефона</h3>
	// 					<a href='https://api.whatsapp.com/send?phone=79234567890' target='_blank'>
	// 						+79922453710
	// 					</a>
	// 				</div>
	// 				<div className={styles.footerIcons}>
	// 					<MaterialIcon name='MdPhone' />
	// 					<MaterialIconFa name='FaWhatsapp' />
	// 				</div>
	// 			</div>
	// 			<div className={styles.footerMaps}>
	// 				<h2>Мы на карте</h2>
	// 				<div>
	// 					<iframe
	// 						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1069.636291484439!2d39.824711621012966!3d57.57582777364348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b2937ca60dd203%3A0x7e80712ae141c1ab!2z0YPQuy4g0JPQsNCz0LDRgNC40L3QsCwgNjUsINCv0YDQvtGB0LvQsNCy0LvRjCwg0K_RgNC-0YHQu9Cw0LLRgdC60LDRjyDQvtCx0LsuLCAxNTAwNDY!5e0!3m2!1sru!2sru!4v1683587473179!5m2!1sru!2sru'
	// 						width='500'
	// 						height='280'
	// 						allowFullScreen={true}
	// 						loading='lazy'
	// 						referrerPolicy='no-referrer-when-downgrade'
	// 					></iframe>
	// 				</div>
	// 			</div>
	// 			<div className={styles.footerLinks}>
	// 				<div className={styles.footerLinksInner}>
	// 					<Link className={styles.footerLink} href={'/delivery'}>
	// 						Доставка
	// 					</Link>
	// 					<Link href={'/contacts'} className={styles.footerLink}>
	// 						Контакты
	// 					</Link>
	// 					<Link href={'/contacts'} className={styles.footerLink}>
	// 						Как добраться?
	// 					</Link>
	// 				</div>
	// 				<div>
	// 					<Link href={'/'}>
	// 						<Image src={logo} width={95} height={40} alt='логотип' />
	// 					</Link>
	// 				</div>
	// 			</div>
	// 		</div>

	// 		<div className={styles.footerBottom}>
	// 			<div>Разработчик </div>
	// 			<a href='https://vk.com/id491549316' target='_blank'>
	// 				<div>https://vk.com/id491549316</div> <MaterialIconFa name='FaVk' />
	// 			</a>
	// 		</div>
	// 	</footer>
	// </div>
	//)

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

	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
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

			<div className='min-h-full p-4 flex flex-col'>{children}</div>
		</>
	)
}

export default Layout
