import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { UseFormSetValue } from 'react-hook-form'
import { IUpdateProduct } from 'types/product.types'

import { ProductService } from '@/services/product.service'

export const useProductEdit = (setValue: UseFormSetValue<IUpdateProduct>) => {
	const { query, push } = useRouter()
	const productId = Number(query.id)
	const { isLoading } = useQuery({
		queryKey: ['get product by id', productId],
		queryFn: () => ProductService.getProductById(productId),
		onSuccess: ({ data }) => {},
		onError: (error) => {},
	})
}
