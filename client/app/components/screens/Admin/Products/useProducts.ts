import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'

import { useDebounced } from '@/hooks/useDebounced'

import { ProductService } from '@/services/product.service'

export const useProducts = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const { push } = useRouter()
	const debouncedValue = useDebounced(setSearchTerm, 500)
	const queryData = useQuery
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	const {} = useMutation({
		mutationKey: ['create product'],
		mutationFn: () => ProductService.createProduct(),
		onError: (error) => {},
	})
	return useMemo(() => ({}), [])
}
