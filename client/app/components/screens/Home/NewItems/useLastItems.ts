import { useQuery } from '@tanstack/react-query'

import { ProductService } from '@/services/product.service'

import { toastrError } from '@/utils/toastrError'

export const useLastItems = () =>
	useQuery({
		queryKey: ['list of last products'],
		queryFn: () => ProductService.getLastProducts(),
		onError: (error) => {
			toastrError(error, 'Не удалось загрузить новые товары')
		},
	})
