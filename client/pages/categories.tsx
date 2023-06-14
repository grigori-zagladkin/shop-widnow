import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { ICategory } from 'types/category.types'

import CategoriesList from '@/components/screens/CategoriesList'

import { CategoryService } from '@/services/category.service'

const CategoriesPage: NextPage<{ categories: ICategory[] }> = ({
	categories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	console.log(categories)

	return <CategoriesList categories={categories} />
}

export const getStaticProps: GetStaticProps<{ categories: ICategory[] }> = async () => {
	try {
		const { data: categories } = await CategoryService.getAllCategories()
		return {
			props: {
				categories: categories,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default CategoriesPage
