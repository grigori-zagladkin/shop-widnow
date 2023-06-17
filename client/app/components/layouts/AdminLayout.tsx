import {
	ExperimentOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PictureOutlined,
	RollbackOutlined,
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

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer },
	} = theme.useToken()
	const { push } = useRouter()
	return (
		<Layout className='min-h-screen'>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className='demo-logo-vertical'></div>
				<Menu
					items={[
						{
							icon: <ExperimentOutlined />,
							key: 1,
							label: 'Атрибуты',
							onClick: () => {
								push(getAdminUrl('attributes'))
								setCollapsed(false)
							},
						},
						{
							icon: <SwitcherOutlined />,
							key: 2,
							label: 'Категории',
							onClick: () => {
								push(getAdminUrl('categories'))
								setCollapsed(false)
							},
						},
						{
							icon: <ShoppingOutlined />,
							key: 3,
							label: 'Товары',
							onClick: () => {
								push(getAdminUrl(''))
								setCollapsed(false)
							},
						},
						{
							icon: <PictureOutlined />,
							key: 4,
							label: 'Баннеры',
							onClick: () => {
								push(getAdminUrl('banners'))
								setCollapsed(false)
							},
						},
						{
							icon: <RollbackOutlined />,
							key: 5,
							label: 'Главная',
							onClick: () => {
								push('/')
								setCollapsed(false)
							},
						},
					]}
					theme='dark'
					mode='inline'
				/>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
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
					<h3 className='text-xl font-medium'>Панель администратора</h3>
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						background: colorBgContainer,
					}}
					className='min-h-fit'
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	)
}

export default AdminLayout
