import {
	ExperimentOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	ShoppingOutlined,
	SwitcherOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useState } from 'react'

import { getAdminUrl } from '@/config/url.config'

const { Header, Sider, Content } = Layout

export interface ILink {
	link: string
	title: string
}

const AdminNavData: ILink[] = [
	// {
	// 	link: ,
	// 	title: 'Атрибуты',
	// },
	{
		link: getAdminUrl('/categories'),
		title: 'Категории',
	},
	{
		link: getAdminUrl(''),
		title: 'Товары',
	},
]

// const AdminLayout: FC<PropsWithChildren<{ title: string }>> = ({ children, title }) => (
// 	<div className={styles.AdminLayout}>
// 		<nav>
// 			<ul>
// 				{AdminNavData.map((link) => (
// 					<li>
// 						<Link href={link.link}>{link.title}</Link>
// 					</li>
// 				))}
// 			</ul>
// 		</nav>
// 		<section className='w-full'>
// 			<Heading>{title}</Heading>
// 			{children}
// 		</section>
// 	</div>
// )

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer },
	} = theme.useToken()
	const { push } = useRouter()
	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className='demo-logo-vertical'></div>
				<Menu theme='dark' mode='inline'>
					<Menu.Item
						icon={<ExperimentOutlined />}
						onClick={() => {
							push(getAdminUrl('/attributes'))
							setCollapsed(false)
						}}
					>
						Атрибуты
					</Menu.Item>
					<Menu.Item
						icon={<SwitcherOutlined />}
						onClick={() => {
							push(getAdminUrl('/categories'))
							setCollapsed(false)
						}}
					>
						Категории
					</Menu.Item>
					<Menu.Item
						icon={<ShoppingOutlined />}
						onClick={() => {
							push(getAdminUrl(''))
							setCollapsed(false)
						}}
					>
						Товары
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<Button
						type='text'
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	)
}

export default AdminLayout
