import { Heading } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { ICategory } from 'types/category.types'

import Meta from '@/utils/meta/Meta'

import styles from './CategoriesList.module.scss'

const CategoriesList: FC<{ categories: ICategory[] }> = ({ categories }) => {
	return (
		<Meta title='Каталог'>
			<Heading as={'h2'} className='text-center lg:text-start'>
				Категории товаров
			</Heading>
			<ul className={styles.wrapper}>
				{categories.map((item, idx) => (
					<li>
						<Link href={`/category/${item.slug}`}>
							<Image height={300} width={300} src={item.image} alt='window' />
							<div className={styles.title}>{item.title}</div>
							<div className={styles.descr}>{item.description}</div>
						</Link>
					</li>
				))}
			</ul>
		</Meta>
	)
}

export default CategoriesList
