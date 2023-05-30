import { FC } from 'react'

import AdminLayout from '@/components/layouts/AdminLayout'

import Meta from '@/utils/meta/Meta'

const ProductEdit: FC = () => {
	return (
		<Meta title='Редактирование товара'>
			<AdminLayout title='Редактирование товара'></AdminLayout>
		</Meta>
	)
}

export default ProductEdit
