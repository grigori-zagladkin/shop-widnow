import { GetStaticProps, NextPage } from 'next'

import Home, { IHomeProps } from '@/components/screens/Home'

import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product.service'

const HomePage: NextPage<IHomeProps> = ({ lastProducts, categories }) => {
	return <Home lastProducts={lastProducts} categories={categories} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: categories } = await CategoryService.getAllCategories()
		const { data: lastItems } = await ProductService.getLastProducts()
		console.log(categories, lastItems)
		return {
			props: {
				categories,
				lastProducts: lastItems,
			} as IHomeProps,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default HomePage
