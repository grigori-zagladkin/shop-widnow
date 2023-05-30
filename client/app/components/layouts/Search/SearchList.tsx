import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { IProduct } from 'types/product.types'

import styles from './Search.module.scss'

const SearchList: FC<{ products: IProduct[] }> = ({ products }) => {
	console.log(products)
	return (
		<div className={styles.list}>
			{products.length ? (
				products.map((product) => (
					<Link href={`/products/${product.slug}`}>
						<Image
							src={product.images[0]}
							alt={product.title}
							width={60}
							height={60}
							objectFit='cover'
							objectPosition='top'
							draggable={false}
						/>
						<div>
							<div>{product.title}</div>
							<div>{product.price}</div>
						</div>
					</Link>
				))
			) : (
				<div className={styles.notFound}>Товары не найдены!</div>
			)}
		</div>
	)
}

export default SearchList
