import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'

import { useDebounced } from '@/hooks/useDebounced'

import { ProductService } from '@/services/product.service'

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounced(searchTerm, 500)
	const { isSuccess, data } = useQuery({
		queryKey: ['search products list', debouncedSearch],
		queryFn: () => ProductService.getAllProduct({ searchTerm: debouncedSearch }),
		select: ({ data }) => data,
		enabled: !!debouncedSearch,
	})
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	return { isSuccess, data, searchTerm, handleSearch }
}
