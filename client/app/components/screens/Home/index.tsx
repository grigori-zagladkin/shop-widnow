import { FC } from 'react'
import { IBanner } from 'types/banner.types'
import { ICategory } from 'types/category.types'
import { IProduct } from 'types/product.types'

import Meta from '@/utils/meta/Meta'

import Banner from './Banner'
import CategoryBlock from './CategoryBlock'
import styles from './Home.module.scss'
import NewItems from './NewItems'

export interface IHomeProps {
	lastProducts: IProduct[]
	categories: ICategory[]
	banners: IBanner[]
}

const Home: FC<IHomeProps> = ({ lastProducts, categories, banners }) => {
	return (
		<Meta title='Главная'>
			<div className={styles.topBlock}>
				<div className='flex mb-[50px] gap-[100px]'>
					<CategoryBlock categories={categories} />
					<Banner banners={banners} />
				</div>
				<NewItems lastProducts={lastProducts} />
			</div>
		</Meta>
	)
}

export default Home
