import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Skeleton, Table } from 'antd'
import { FC } from 'react'

import Meta from '@/utils/meta/Meta'

import { useProducts } from './useProducts'

const ProductListManage: FC = () => {
	const { handleSearch, createAsync, isLoading, data, searchTerm, columns } = useProducts()
	return (
		<Meta title='Список товаров'>
			<div className='flex w-full gap-[30px] justify-between items-center mb-[30px]'>
				<Input
					prefix={<SearchOutlined />}
					className='max-w-[300px]'
					type='search'
					value={searchTerm}
					onChange={handleSearch}
				/>
				<Button
					className='flex items-center max-w-[200px]'
					onClick={() => {
						createAsync()
					}}
				>
					<PlusOutlined /> Создать категорию
				</Button>
			</div>
			{isLoading ? <Skeleton /> : <Table scroll={{ x: 700 }} columns={columns} dataSource={data} />}
		</Meta>
	)
}

export default ProductListManage
