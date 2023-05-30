import { axiosWithAuth } from '@/api/api.interceptor'

export const FileService = {
	async createFile(file: FormData, folder?: string) {
		return await axiosWithAuth.post<{ url: string; name: string }[]>(`/files`, file, {
			params: {
				folder,
			},
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	async deleteFile(fileName: string, folder?: string) {
		return axiosWithAuth.delete(`/files/${fileName}`, {
			params: {
				folder,
			},
		})
	},
}
