import { Modal } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { ICategory } from 'types/category.types'

import styles from './CategoriesModalList.module.scss'

interface IProps {
	categories: ICategory[]
	isOpen: boolean
	handleCancel: () => void
}

const CategoriesModalList: FC<IProps> = ({ categories, handleCancel, isOpen }) => (
	<Modal footer={null} title={'Категории'} width={900} onCancel={handleCancel} open={isOpen}>
		<ul className={styles.wrapper}>
			{categories.map((item, idx) => (
				<li>
					<Link href={`/category/${item.slug}`}>
						<div className={styles.imgWrapper}>
							<Image src={item.image} className='w-full h-full object-center object-cover' alt='' fill />
						</div>
						<div className={styles.title}>{item.title}</div>
						<div className={styles.descr}>{item.description}</div>
					</Link>
				</li>
			))}
		</ul>
	</Modal>
)

export default CategoriesModalList
