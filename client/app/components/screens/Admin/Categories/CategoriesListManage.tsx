import { PlusCircleFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Skeleton, Table } from 'antd'
import { FC } from 'react'

import AdminTable from '@/components/ui/AdminTable'

import Meta from '@/utils/meta/Meta'

import { useAdminCategories } from './useCategories'

const CategoriesListManage: FC = () => {
	const { handleSearch, createAsync, columns, isLoading, data, searchTerm } = useAdminCategories()
	return (
		<Meta title='Список категорий'>
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

export default CategoriesListManage
