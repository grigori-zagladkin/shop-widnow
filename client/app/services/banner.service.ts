import { IBanner, IUpdateBanner } from 'types/banner.types'

import { getBannersApiUrl } from '@/config/api.config'

import { axiosWithAuth, axiosWithoutAuth } from '@/api/api.interceptor'

export const BannerService = {
	async getAllBanners() {
		return await axiosWithoutAuth.get<IBanner[]>(getBannersApiUrl(''))
	},
	async getBannerById(id: number) {
		return await axiosWithAuth.get<IBanner>(getBannersApiUrl(`/${id}`))
	},
	async createBanner() {
		return await axiosWithAuth.post<number>(getBannersApiUrl(''))
	},
	async updateBanner(id: number, data: IUpdateBanner) {
		return await axiosWithAuth.patch<IBanner>(getBannersApiUrl(`/${id}`), data)
	},
	async deleteBanner(id: number) {
		return await axiosWithAuth.delete<string>(getBannersApiUrl(`/${id}`))
	},
}
