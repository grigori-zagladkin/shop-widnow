import { FC } from 'react'

import Meta from '@/utils/meta/Meta'

import { IProductPage } from '../../../../pages/products/[slug]'

import styles from './Product.module.scss'

const Product: FC<IProductPage> = ({ product }) => {
	return (
		<Meta title={product.title}>
			<section className={styles.wrapper}></section>
		</Meta>
	)
}

export default Product
