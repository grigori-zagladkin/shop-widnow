import { FC } from 'react'
import { ICategory } from 'types/category.types'
import { IProduct } from 'types/product.types'

import Meta from '@/utils/meta/Meta'

import CategoryBlock from './CategoryBlock'
import styles from './Home.module.scss'
import NewItems from './NewItems'

export interface IHomeProps {
	lastProducts: IProduct[]
	categories: ICategory[]
}

const Home: FC<IHomeProps> = ({ lastProducts, categories }) => {
	return (
		<Meta title='Главная'>
			<div className={styles.topBlock}>
				<NewItems lastProducts={lastProducts} />
				<CategoryBlock categories={categories} />
			</div>
		</Meta>
	)
}

export default Home
