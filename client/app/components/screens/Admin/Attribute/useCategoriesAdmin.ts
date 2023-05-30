import { useQuery } from '@tanstack/react-query'

import { IOption } from '@/components/ui/form-elements/Select'

import { CategoryService } from '@/services/category.service'

import { toastrError } from '@/utils/toastrError'

export const useCategoriesAdmin = () =>
	useQuery({
		queryKey: ['list of categories'],
		queryFn: () => CategoryService.getAllCategories(),
		onError: (error) => {
			toastrError(error, 'Ошибка при получении данyых о категориях')
		},
		select: ({ data }) =>
			data.map(
				(category): IOption => ({
					label: category.title,
					value: category.id,
				}),
			),
	})
