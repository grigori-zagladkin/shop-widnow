import { IAttribute, IUpdateAttribute } from 'types/attribute.types'

import { getAttributeApiUrl } from '@/config/api.config'

import { axiosWithAuth } from '@/api/api.interceptor'

export const AttributeService = {
	async createAttribute() {
		return await axiosWithAuth.post<number>(getAttributeApiUrl(''))
	},
	async getAttributeById(id: number) {
		return await axiosWithAuth.get<IAttribute>(getAttributeApiUrl(`/${id}`))
	},
	async updateAttribute(id: number, dto: IUpdateAttribute) {
		return await axiosWithAuth.put<IAttribute>(getAttributeApiUrl(`/${id}`), dto)
	},
	async deleteAttribute(id: number) {
		return await axiosWithAuth.delete<string>(getAttributeApiUrl(`/${id}`))
	},
	async getAllAttributes(searchTerm?: string) {
		return await axiosWithAuth.get<IAttribute[]>(getAttributeApiUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},
	async getAttributeByCategory(categoryId: number) {
		let data = await axiosWithAuth.get<IAttribute[]>(getAttributeApiUrl(`/category/${categoryId}`))
		return data
	},
}
