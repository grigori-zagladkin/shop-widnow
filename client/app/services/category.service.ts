import { ICategory, IUpdateCategory } from 'types/category.types'

import { getCategoriesApiUrl } from '@/config/api.config'

import { axiosWithAuth, axiosWithoutAuth } from '@/api/api.interceptor'

export const CategoryService = {
	async getAllCategories(searchTerm?: string) {
		let data = await axiosWithoutAuth.get<ICategory[]>(getCategoriesApiUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
		return data
	},
	async getCategoryBySlug(slug: string) {
		return await axiosWithoutAuth.get<ICategory>(getCategoriesApiUrl(`/by-slug/${slug}`))
	},
	async getCategoryById(id: number) {
		return await axiosWithAuth.get<ICategory>(getCategoriesApiUrl(`/${id}`))
	},
	async createCategory() {
		return await axiosWithAuth.post<number>(getCategoriesApiUrl(''))
	},
	async updateCategory(id: number, data: IUpdateCategory) {
		return await axiosWithAuth.put<ICategory>(getCategoriesApiUrl(`/${id}`), data)
	},
	async deleteCategory(id: number) {
		return await axiosWithAuth.delete<string>(getCategoriesApiUrl(`/${id}`))
	},
}
