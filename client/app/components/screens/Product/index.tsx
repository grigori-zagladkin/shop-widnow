import { Modal } from 'antd'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'
import { IProduct } from 'types/product.types'

import Meta from '@/utils/meta/Meta'

import styles from './Product.module.scss'

const Product: FC<{ product: IProduct }> = ({
	product: { images, title, price, count, description, category, attributes },
}) => {
	const [previewImage, setPreviewImage] = useState(images[0])
	const [isOpenModal, setIsOpenModal] = useState(false)
	const handleCancel = () => setIsOpenModal(false)
	return (
		<Meta title={title}>
			<div className={styles.wrapper}>
				<div>
					<Modal footer={null} title={title} open={isOpenModal} onCancel={handleCancel}>
						<img className='w-full mt-10 rounded-[10px] block' src={previewImage} alt='картинка' />
					</Modal>
					<div className={clsx(styles.imgWrapper, styles.mainImage)}>
						<Image
							quality={1}
							priority
							onClick={() => {
								setPreviewImage(images[0])
								setIsOpenModal(true)
							}}
							fill
							className={styles.image}
							alt='Картинка товара'
							src={images[0]}
						/>
					</div>
					<div className={styles.images}>
						{images.map((img, idx) => (
							<div
								key={idx}
								onClick={() => {
									setPreviewImage(img)
									setIsOpenModal(true)
								}}
								className={styles.littleImage}
							>
								<Image fill alt='Картинка товара' src={img} />
							</div>
						))}
					</div>
				</div>
				<div>
					<div className={styles.title}>{title}</div>
					<div className={styles.price}>{price}р</div>
					<div className={count === 0 ? styles.empty : styles.count}>{count === 0 ? 'Нет наличии' : 'В наличии'}</div>
					<div className={styles.description}>{description}</div>
					<hr className={styles.border} />
					<div className={styles.header}>Характеристики</div>
					<ul className={styles.attributesWrapper}>
						<li className={styles.attributeItem}>
							<span className={styles.attribute}>Категория: </span>
							<span className={styles.value}>{category.title}</span>
						</li>
						{attributes.map((item, idx) => (
							<li className={styles.attributeItem} key={idx}>
								<span className={styles.attribute}>
									{item.attribute}
									{': '}
								</span>
								<span className={styles.value}>{item.value}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</Meta>
	)
}

export default Product
