import { FC } from 'react'
import { IProduct } from 'types/product.types'

import Meta from '@/utils/meta/Meta'

const Product: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<Meta title={product.title}>
			<div>
				<div>
					<div></div>
					<div></div>
				</div>
				<div></div>
			</div>
		</Meta>
	)
}

export default Product
