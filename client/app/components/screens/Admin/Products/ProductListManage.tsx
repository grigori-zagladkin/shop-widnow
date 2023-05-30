import { FC } from 'react'

import AdminLayout from '@/components/layouts/AdminLayout'

import Meta from '@/utils/meta/Meta'

const ProductListManage: FC = () => {
	return (
		<Meta title='Список товаров'>
			<AdminLayout title='Список товаров'></AdminLayout>
		</Meta>
	)
}

export default ProductListManage
