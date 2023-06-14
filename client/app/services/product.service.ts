import { IProduct, IProductPagination, ISearchDto, IUpdateProduct } from 'types/product.types'

import { getProductsApiUrl } from '@/config/api.config'

import { axiosWithAuth, axiosWithoutAuth } from '@/api/api.interceptor'

export const ProductService = {
	async getProductBySlug(slug: string) {
		return await axiosWithoutAuth.get<IProduct>(getProductsApiUrl(`/by-slug/${slug}`))
	},
	async getLastProducts() {
		return await axiosWithoutAuth.get<IProduct[]>(getProductsApiUrl(`/last`))
	},
	async getSimilarProduct(slug: string) {
		return await axiosWithoutAuth.get<IProduct[]>(getProductsApiUrl(`/similar/${slug}`))
	},
	async getAllProduct(search?: ISearchDto) {
		return await axiosWithoutAuth.get<IProductPagination>(getProductsApiUrl(``), {
			params: search
				? {
						...search,
				  }
				: {},
		})
	},
	async createProduct() {
		return await axiosWithAuth.post<number>(getProductsApiUrl(``))
	},
	async getProductById(id: number) {
		return await axiosWithAuth.get<IProduct>(getProductsApiUrl(`/${id}`))
	},
	async updateProduct(id: number, data: IUpdateProduct) {
		return await axiosWithAuth.patch<IProduct>(getProductsApiUrl(`/${id}`), data)
	},
	async deleteProduct(id: number) {
		return await axiosWithAuth.delete<IProduct>(getProductsApiUrl(`/${id}`))
	},
}
