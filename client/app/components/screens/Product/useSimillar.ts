import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { ProductService } from '@/services/product.service'

export const useSimilar = () => {
	const { query } = useRouter()
	const slug = String(query.slug)
	const queryData = useQuery({
		queryKey: ['get similar products', slug],
		queryFn: () => ProductService.getSimilarProduct(slug),
	})
	return queryData
}
