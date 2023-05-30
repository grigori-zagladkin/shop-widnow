import { FC } from 'react'

import AdminLayout from '@/components/layouts/AdminLayout'
import AdminTable from '@/components/ui/AdminTable'

import Meta from '@/utils/meta/Meta'

import { useAttributes } from './useAttributies'

const AttributesListManage: FC = () => {
	const { isLoading, data, handleSearch, searchTerm, createAsync, deleteAsync } = useAttributes()
	return (
		<Meta title='Атрибуты'>
			<AdminLayout title='Атрибуты'>
				<AdminTable
					headerItems={['id', 'Название']}
					handleSearch={handleSearch}
					isLoading={isLoading}
					onClick={createAsync}
					tableItems={data || []}
					removeHandler={deleteAsync}
					searchTerm={searchTerm}
				/>
			</AdminLayout>
		</Meta>
	)
}

export default AttributesListManage
