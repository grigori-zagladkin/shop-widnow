import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'
import { IUpdateProduct } from 'types/product.types'

import { ProductService } from '@/services/product.service'

import { toastrError } from '@/utils/toastrError'

export const useProductEdit = (setValue: UseFormSetValue<IUpdateProduct>) => {
	const { query, push } = useRouter()
	const productId = Number(query.id)
	const productData = useQuery({
		queryKey: ['get product by id', productId],
		queryFn: () => ProductService.getProductById(productId),
		onSuccess: ({ data }) => {
			setValue('title', data['title'])
			setValue('price', data['price'])
			setValue('count', data['count'])
			setValue('category', data['category'])
		},
		onError: (error) => {
			toastrError(error, 'Ошибка при загрузке товара')
		},
	})
	const { mutateAsync } = useMutation({
		mutationKey: ['update product', productId],
		mutationFn: (data: IUpdateProduct) => ProductService.updateProduct(productId, data),
		onError: (error) => {
			toastrError(error, 'Ошибка при обновлении товара')
		},
		onSuccess: () => {
			push(`/manage`)
			productData.refetch()
			toastr.success('Создание товара', 'Успешно')
		},
	})
	const onSubmit: SubmitHandler<IUpdateProduct> = async (data) => {
		await mutateAsync(data)
	}
	return { productData, onSubmit }
}
