import { useQuery } from '@tanstack/react-query'

import { IOption } from '@/components/ui/form-elements/Select'

import { CategoryService } from '@/services/category.service'

import { toastrError } from '@/utils/toastrError'

export const useCategoryData = () => {
	let optionData: IOption[] = []
	const categoriesData = useQuery({
		queryKey: ['get all categories'],
		queryFn: () => CategoryService.getAllCategories(),
		onError: (error) => {
			toastrError(error, 'Ошибка при загрузке категорий')
		},
		onSuccess: ({ data }) => {
			optionData = data.map(
				(category): IOption => ({
					label: category.title,
					value: category.id,
				}),
			)
		},
	})
	return { optionData, categoriesData }
}
