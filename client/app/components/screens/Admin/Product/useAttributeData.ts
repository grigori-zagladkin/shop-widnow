import { useQuery } from '@tanstack/react-query'
import { UseFormSetValue } from 'react-hook-form'
import { IUpdateProduct } from 'types/product.types'

import { AttributeService } from '@/services/attribute.service'

import { toastrError } from '@/utils/toastrError'

export const useAttributeData = (setValue: UseFormSetValue<IUpdateProduct>) => {
	return useQuery({
		queryKey: ['get list of attributes'],
		queryFn: () => AttributeService.getAllAttributes(),
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
				setValue(`attributes.${idx}.attribute`, item.attribute)
				setValue(`attributes.${idx}.value`, item.value)
			})
		},
	})
}
