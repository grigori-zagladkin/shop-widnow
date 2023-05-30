import { GetStaticProps, NextPage } from 'next'
import { ICategory } from 'types/category.types'

import CategoriesList from '@/components/screens/CategoriesList'

import { CategoryService } from '@/services/category.service'

import Error404 from './404'

const CategoriesPage: NextPage<{ categories: ICategory[] }> = ({ categories }) => {
	return categories ? <CategoriesList categories={categories} /> : <Error404 />
}

const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: categories } = await CategoryService.getAllCategories('')
		return {
			props: {
				categories,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default CategoriesPage
