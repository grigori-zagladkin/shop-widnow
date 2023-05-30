import { FC } from 'react'
import { ICategory } from 'types/category.types'

import BreadCrumbs, { ILinkPath } from '@/components/ui/BreadCrumbs'
import Heading from '@/components/ui/Heading'

import Meta from '@/utils/meta/Meta'

const CategoriesList: FC<{ categories: ICategory[] }> = ({ categories }) => {
	const path: ILinkPath[] = [
		{
			name: 'Главная',
			link: '/',
		},
		{
			name: 'Каталог',
			link: '/categories',
		},
	]
	return (
		<Meta title='Каталог'>
			<Heading>Каталог</Heading>
			<BreadCrumbs path={path} />
			<ul>
				{categories.map((category, index) => (
					<li>{category.title}</li>
				))}
			</ul>
		</Meta>
	)
}

export default CategoriesList
