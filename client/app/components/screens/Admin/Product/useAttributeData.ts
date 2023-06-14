import { useQuery } from '@tanstack/react-query'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { IUpdateProduct } from 'types/product.types'

import { AttributeService } from '@/services/attribute.service'

import { toastrError } from '@/utils/toastrError'

export const useAttributeData = (setValue: UseFormSetValue<IUpdateProduct>, watch: UseFormWatch<IUpdateProduct>) => {
	const categoryId = watch('categoryId')
	return useQuery({
		queryKey: ['get list of attributes', categoryId],
		queryFn: () => AttributeService.getAttributeByCategory(categoryId || 2),
		onError: (error) => {
			toastrError(error, 'Ошибка при загрузке атрибутов')
		},
		select: ({ data }) =>
			data.map((item, idx) => ({
				attribute: item.title,
				value: '',
			})),
		onSuccess: (data) => {
			data.map((item, idx) => {
				setValue(`attributes.${idx}.attribute`, data[idx].attribute)
				setValue(`attributes.${idx}.value`, data[idx].value)
			})
		},
	})
}
