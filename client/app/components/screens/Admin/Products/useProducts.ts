import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/AdminTable/AdminTableItem'

import { useDebounced } from '@/hooks/useDebounced'

import { ProductService } from '@/services/product.service'

import { toastrError } from '@/utils/toastrError'

import { getAdminUrl } from '@/config/url.config'

export const useProducts = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const { push } = useRouter()
	const debouncedValue = useDebounced(searchTerm, 500)
	const queryData = useQuery({
		queryKey: ['list of products', debouncedValue],
		queryFn: () => ProductService.getAllProduct({ searchTerm: debouncedValue }),
		select: ({ data }) =>
			data.products.map(
				(product): ITableItem => ({
					id: product.id,
					editUrl: getAdminUrl(`/products/${product.id}`),
					items: [product.title, String(product.price)],
				}),
			),
	})
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create product'],
		mutationFn: () => ProductService.createProduct(),
		onError: (error) => {
			toastrError(error, 'Создание товара')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Создание товара', 'Успешно')
			push(getAdminUrl(`/products/${id}`))
		},
	})
	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete product'],
		mutationFn: (productId: number) => ProductService.deleteProduct(productId),
		onSuccess: () => {
			toastr.success('Удалить товар', 'Успешно')
			queryData.refetch()
		},
		onError: (error) => {
			toastrError(error, 'Ошибка при удалении товара')
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
