import { FC } from 'react'

import AdminLayout from '@/components/layouts/AdminLayout'
import AdminTable from '@/components/ui/AdminTable'

import Meta from '@/utils/meta/Meta'

import { useProducts } from './useProducts'

const ProductListManage: FC = () => {
	const { handleSearch, createAsync, deleteAsync, isLoading, data, searchTerm } = useProducts()
	return (
		<Meta title='Список товаров'>
			<AdminLayout title='Список товаров'>
				<AdminTable
					tableItems={data || []}
					isLoading={isLoading}
					headerItems={['Название', 'Цена']}
					removeHandler={deleteAsync}
					searchTerm={searchTerm}
					handleSearch={handleSearch}
					onClick={createAsync}
				/>
			</AdminLayout>
		</Meta>
	)
}

export default ProductListManage
