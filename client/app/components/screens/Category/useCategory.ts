import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { EnumSortProduct, ISearchDto } from 'types/product.types'

import { useDebounced } from '@/hooks/useDebounced'

import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product.service'

import { toastrError } from '@/utils/toastrError'

export const useCategory = () => {
	const { query } = useRouter()
	const categorySlug = String(query.slug)
	const categoryData = useQuery({
		queryKey: ['get category by slug', categorySlug],
		queryFn: () => CategoryService.getCategoryBySlug(categorySlug),
		select: ({ data }) => ({
			title: data.title,
			id: data.id,
		}),
	})
	const [searchTerm, setSearchTerm] = useState('')
	const debounceValue = useDebounced(searchTerm, 500)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	const [minPrice, setMinPrice] = useState(0)
	const [maxPrice, setMaxPrice] = useState(1000000)
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(50)
	const [sortType, setSortType] = useState<EnumSortProduct>(EnumSortProduct.LOW_PRICE)
	const queryDto: ISearchDto = {
		maxPrice,
		minPrice,
		searchTerm,
		page: currentPage,
		perPage,
		categoryId: categoryData?.data?.id,
		sort: sortType,
	}
	console.log(queryDto)
	const productData = useQuery({
		queryKey: ['get products by query', queryDto],
		queryFn: () => ProductService.getAllProduct(queryDto),
		onError: (error) => {
			toastrError(error, 'Ошибка при загрузке данных')
		},
		enabled: !!queryDto,
	})
	let debounceMinPrice = useDebounced(minPrice, 500)
	let debounceMaxPrice = useDebounced(maxPrice, 500)
	const handleChangePrice = ([num1, num2]: number[]) => {
		setMaxPrice(num2)
		setMinPrice(num1)
	}
	return {
		categoryData,
		productData,
		minPrice,
		maxPrice,
		currentPage,
		perPage,
		sortType,
		searchTerm,
		setCurrentPage,
		handleChangePrice,
		handleSearch,
		setSortType,
		setPerPage,
	}
}
