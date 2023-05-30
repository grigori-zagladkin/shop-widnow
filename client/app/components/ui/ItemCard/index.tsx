import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { IProduct } from 'types/product.types'

import styles from './ItemCard.module.scss'

const ItemCard: FC<{ item: IProduct }> = ({ item: { slug, images, title, price, count } }) => {
	const [activeImage, setActiveImage] = useState(0)
	return (
		<Link href={`/products/${slug}`} className={styles.wrapper}>
			<div className={styles.images}>
				<Image alt={title} src={images[0]} width={200} height={220} unoptimized draggable={false} />
			</div>
			<div className={styles.title}>{title}</div>
			<div className={styles.price}>
				<span>{price}</span> руб
			</div>
			<div
				className={clsx({
					[styles.emptyCount]: count === 0,
					[styles.count]: count >= 1,
				})}
			>
				{count ? 'в наличии' : 'нет в наиличии'}
			</div>
		</Link>
	)
}

export default ItemCard
