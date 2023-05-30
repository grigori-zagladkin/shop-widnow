import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { IProduct } from 'types/product.types'

import Product from '@/components/screens/Product'

import { ProductService } from '@/services/product.service'

import Error404 from '../404'

export interface IProductPage {
	product: IProduct
}

const ProductPage: NextPage<IProductPage> = ({ product }) => {
	return product ? <Product product={product} /> : <Error404 />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { data } = await ProductService.getProductBySlug(String(params?.slug))
	return {
		props: {
			product: data,
		},
		revalidate: 60,
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data } = await ProductService.getAllProduct()
		const paths = data.products.map((p) => ({ params: { slug: p.slug } }))
		return {
			paths,
			fallback: 'blocking',
		}
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export default ProductPage
