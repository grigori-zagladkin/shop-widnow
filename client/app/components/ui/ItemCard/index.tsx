import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { IProduct } from 'types/product.types'

import styles from './ItemCard.module.scss'

const ItemCard: FC<{ item: IProduct }> = ({ item: { slug, images, title, price, count } }) => {
	return (
		<Link href={`/products/${slug}`} className={styles.wrapper}>
			<div className={styles.circle}></div>
			{images[0] ? (
				<Image
					alt={title}
					src={images[0]}
					width={200}
					height={300}
					className={styles.image}
					unoptimized
					draggable={false}
				/>
			) : (
				<div className={clsx(styles.images, 'bg-gray-500')}></div>
			)}
			<div className={styles.info}>
				<div
					className={clsx({
						[styles.emptyCount]: count === 0,
						[styles.count]: count >= 1,
					})}
				>
					{count ? 'в наличии' : 'нет в наиличии'}
				</div>
				<div className={styles.title}>{title}</div>
				<div className={styles.price}>
					<span>{price}</span> руб
				</div>
			</div>
		</Link>
	)
}

export default ItemCard
