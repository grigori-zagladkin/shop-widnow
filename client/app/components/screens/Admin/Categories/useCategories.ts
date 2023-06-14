import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/AdminTable/AdminTableItem'

import { useDebounced } from '@/hooks/useDebounced'

import { CategoryService } from '@/services/category.service'

import { toastrError } from '@/utils/toastrError'

import { getAdminUrl } from '@/config/url.config'

export const useAdminCategories = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const { push } = useRouter()
	const debouncedValue = useDebounced(searchTerm, 500)
	const queryData = useQuery({
		queryKey: ['list of categories', debouncedValue],
		queryFn: () => CategoryService.getAllCategories(debouncedValue),
		select: ({ data }) =>
			data.map(
				(category): ITableItem => ({
					id: category.id,
					editUrl: getAdminUrl(`/categories/${category.id}`),
					items: [category.title, category.description.slice(0, 10) + '...'],
				}),
			),
	})
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create category'],
		mutationFn: () => CategoryService.createCategory(),
		onError: (error) => {
			toastrError(error, 'Создание категории')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Создание категории', 'Успешно')
			push(getAdminUrl(`/categories/${id}`))
		},
	})
	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete category'],
		mutationFn: (categoryId: number) => CategoryService.deleteCategory(categoryId),
		onSuccess: () => {
			toastr.success('Удалить категорию', 'Успешно')
			queryData.refetch()
		},
		onError: (error) => {
			toastrError(error, 'Ошибка при удалении категории')
		},
	})
	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			createAsync,
			deleteAsync,
			searchTerm,
		}),
		[queryData, createAsync, deleteAsync, searchTerm],
	)
}
