import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'
import { IUpdateBanner } from 'types/banner.types'

import { BannerService } from '@/services/banner.service'

import { toastrError } from '@/utils/toastrError'

import { getAdminUrl } from '@/config/url.config'

export const useBannerEdit = (setValue: UseFormSetValue<IUpdateBanner>) => {
	const { query, push } = useRouter()

	const bannerId = Number(query.id)

	const { isLoading, data, refetch } = useQuery({
		queryKey: ['get banner by id', bannerId],
		queryFn: () => BannerService.getBannerById(bannerId),
		onSuccess: ({ data }) => {
			setValue('title', data['title'])
			setValue('description', data['description'])
			setValue('image', data['image'])
			setValue('order', data['order'])
		},
		onError: (error) => {
			toastrError(error, 'Ошибка при загрузке данных')
		},
		enabled: !!query.id,
	})

	const { mutateAsync } = useMutation({
		mutationKey: ['update banner'],
		mutationFn: (data: IUpdateBanner) => BannerService.updateBanner(bannerId, data),
		onError: (error) => {
			toastrError(error, 'Не удалось обновить баннер')
		},
		onSuccess: () => {
			toastr.success('Обновление баннера', 'Успешно')
			push(getAdminUrl('banners'))
			refetch()
		},
	})

	const onSubmit: SubmitHandler<IUpdateBanner> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading, data }
}
