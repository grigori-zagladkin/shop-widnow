import { useQuery } from '@tanstack/react-query'

import { IOption } from '@/components/ui/form-elements/Select'

import { CategoryService } from '@/services/category.service'

import { toastrError } from '@/utils/toastrError'

export const useCategoryData = () =>
	useQuery({
		queryKey: ['get all categories'],
		queryFn: () => CategoryService.getAllCategories(),
		select: ({ data }) =>
			data.map(
				(category): IOption => ({
					label: category.title,
					value: category.id,
				}),
			),
		onError: (error) => {
			toastrError(error, 'Ошибка при загрузке категорий')
		},
	})
