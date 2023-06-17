import { PlusOutlined } from '@ant-design/icons'
import { Button, Skeleton, Table } from 'antd'
import { FC } from 'react'

import Meta from '@/utils/meta/Meta'

import { useBannerList } from './useBannerList'

const BannerListManage: FC = () => {
	const { isLoading, data, createAsync, columns } = useBannerList()
	return (
		<Meta title='Список всех баннеров'>
			<Button
				className='flex items-center max-w-[200px] my-[30px]'
				onClick={() => {
					createAsync()
				}}
			>
				<PlusOutlined /> Создать баннер
			</Button>
			{isLoading ? (
				<Skeleton />
			) : (
				<Table dataSource={data?.sort((a, b) => a.order - b.order) || []} columns={columns} />
			)}
		</Meta>
	)
}

export default BannerListManage
