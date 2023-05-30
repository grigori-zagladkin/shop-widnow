import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/AdminTable/AdminTableItem'

import { useDebounced } from '@/hooks/useDebounced'

import { AttributeService } from '@/services/attribute.service'

import { toastrError } from '@/utils/toastrError'

import { getAdminUrl } from '@/config/url.config'

export const useAttributes = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounced(searchTerm, 500)

	const queryData = useQuery(
		['list of attributes', debouncedSearch],
		() => AttributeService.getAllAttributes(debouncedSearch),
		{
			onError: (error) => {
				toastrError(error, 'Не удалось загрузить информацию о атрибутах')
			},
			select: ({ data }) =>
				data.map(
					(attribute): ITableItem => ({
						id: attribute.id,
						editUrl: getAdminUrl(`/attributes/${attribute.id}`),
						items: [String(attribute.id), attribute.title],
					}),
				),
		},
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['Create attribute'],
		mutationFn: () => AttributeService.createAttribute(),
		onError: (error) => {
			toastrError(error, 'Создать атрибут')
		},
		onSuccess: ({ data: id }) => {
			push(getAdminUrl(`/attributes/${id}`))
			toastr.success('Создать атрибут', 'успешно')
		},
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['Delete attribute'],
		mutationFn: (attributeId: number) => AttributeService.deleteAttribute(attributeId),
		onError: (error) => {
			toastrError(error, 'Удаление атрибута')
		},
		onSuccess: () => {
			toastr.success('Удалить атрибут', 'Успешно')
			queryData.refetch()
		},
	})

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			createAsync,
			deleteAsync,
		}),
		[queryData, searchTerm, createAsync, deleteAsync],
	)
}
