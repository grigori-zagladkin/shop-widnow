import { GetStaticProps, NextPage } from 'next'

import Home, { IHomeProps } from '@/components/screens/Home'

import { BannerService } from '@/services/banner.service'
import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product.service'

const HomePage: NextPage<IHomeProps> = ({ lastProducts, categories, banners }) => {
	return <Home banners={banners} lastProducts={lastProducts} categories={categories} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: categories } = await CategoryService.getAllCategories()
		const { data: lastItems } = await ProductService.getLastProducts()
		const { data: banners } = await BannerService.getAllBanners()
		return {
			props: {
				categories,
				lastProducts: lastItems,
				banners,
			} as IHomeProps,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default HomePage
