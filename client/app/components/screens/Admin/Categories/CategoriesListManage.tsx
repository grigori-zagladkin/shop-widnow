import { FC } from 'react'

import AdminLayout from '@/components/layouts/AdminLayout'
import AdminTable from '@/components/ui/AdminTable'

import Meta from '@/utils/meta/Meta'

import { useAdminCategories } from './useCategories'

const CategoriesListManage: FC = () => {
	const { handleSearch, createAsync, deleteAsync, isLoading, data, searchTerm } = useAdminCategories()
	return (
		<Meta title='Список категорий'>
			<AdminLayout title='Список категорий'>
				<AdminTable
					tableItems={data || []}
					isLoading={isLoading}
					headerItems={['Название', 'Описание']}
					removeHandler={deleteAsync}
					searchTerm={searchTerm}
					handleSearch={handleSearch}
					onClick={createAsync}
				/>
			</AdminLayout>
		</Meta>
	)
}

export default CategoriesListManage
