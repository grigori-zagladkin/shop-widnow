import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'
import { IUpdateAttribute } from 'types/attribute.types'

import { IOption } from '@/components/ui/form-elements/Select'

import { AttributeService } from '@/services/attribute.service'
import { CategoryService } from '@/services/category.service'

import { toastrError } from '@/utils/toastrError'

import { getAdminUrl } from '@/config/url.config'

export const useAttributeEdit = (setValue: UseFormSetValue<IUpdateAttribute>) => {
	const { query, push } = useRouter()

	const attributeId = Number(query.id)

	const { isLoading, data: attributeData } = useQuery({
		queryKey: ['get attribute by id', attributeId],
		queryFn: () => AttributeService.getAttributeById(attributeId),
		onSuccess: ({ data }) => {
			setValue('title', data['title'])
		},
		onError: (error) => {
			toastrError(error, 'Ошибка при загрузке данных')
		},
		enabled: !!query.id,
	})

	const categoriesData = useQuery({
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
		onSuccess: (data) => {
			setValue('categories', attributeData?.data?.categories || [])
		},
		enabled: !!attributeData,
	})

	const { mutateAsync } = useMutation({
		mutationKey: ['update attribute'],
		mutationFn: (data: IUpdateAttribute) => AttributeService.updateAttribute(attributeId, data),
		onError: (error) => {
			toastrError(error, 'Не удалось обновить атрибут')
		},
		onSuccess: () => {
			toastr.success('Обновление атрибута', 'Успешно')
			push(getAdminUrl('attributes'))
		},
	})

	const onSubmit: SubmitHandler<IUpdateAttribute> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading, categoriesData, attributeData }
}
