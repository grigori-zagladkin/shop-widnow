import { useQuery } from '@tanstack/react-query'

import { CategoryService } from '@/services/category.service'

import { toastrError } from '@/utils/toastrError'

export const useCategories = () =>
	useQuery({
		queryKey: ['list of categories'],
		queryFn: () => CategoryService.getAllCategories(),
		onError: (error) => {
			toastrError(error, 'Ошибка при загрузке категорий')
		},
	})
