import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

import { getAdminUrl } from '@/config/url.config'

import Heading from '../ui/Heading'

import styles from './Layout.module.scss'

export interface ILink {
	link: string
	title: string
}

const AdminNavData: ILink[] = [
	{
		link: getAdminUrl('/attributes'),
		title: 'Атрибуты',
	},
	{
		link: getAdminUrl('/categories'),
		title: 'Категории',
	},
	{
		link: getAdminUrl('/products'),
		title: 'Товары',
	},
]

const AdminLayout: FC<PropsWithChildren<{title: string}>> = ({ children, title }) => (
	<div className={styles.AdminLayout}>
		<nav>
			<Heading>
				Панель
				<br />
				Администратора
			</Heading>
			<ul>
				{AdminNavData.map((link) => (
					<li>
						<Link href={link.link}>{link.title}</Link>
					</li>
				))}
			</ul>
		</nav>
		<section>
			<Heading>{title}</Heading>
			{children}
		</section>
	</div>
)

export default AdminLayout
