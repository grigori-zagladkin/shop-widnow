import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'
import { IUpdateCategory } from 'types/category.types'

import { CategoryService } from '@/services/category.service'
import { FileService } from '@/services/file.service'

import { toastrError } from '@/utils/toastrError'

export const useCategoryEdit = (setValue: UseFormSetValue<IUpdateCategory>) => {
	const { query, push } = useRouter()

	const categoryId = Number(query.id)

	const { isLoading } = useQuery({
		queryKey: ['get category by id', categoryId],
		queryFn: () => CategoryService.getCategoryById(categoryId),
		onSuccess: ({ data }) => {
			setValue('title', data['title'])
			setValue('description', data['description'])
			setValue('image', data['image'])
		},
		onError: (error) => {
			toastrError(error, 'Ошибка при загрузке данных')
		},
		enabled: !!query.id,
	})

	const { mutateAsync } = useMutation({
		mutationKey: ['update category'],
		mutationFn: (data: IUpdateCategory) => CategoryService.updateCategory(categoryId, data),
		onError: (error) => {
			toastrError(error, 'Не удалось обновить категорию')
		},
		onSuccess: () => {
			toastr.success('Обновление категории', 'Успешно')
		},
	})

	const { mutateAsync: deleteImage } = useMutation({
		mutationKey: ['delete image'],
		mutationFn: (fileName: string) => FileService.deleteFile(fileName, 'categories'),
		onSuccess: () => {
			setValue('image', '')
			toastr.success('Удаление изображения', 'Успешно')
		},
		onError: (error) => {
			toastrError(error, 'Ошибка при удалении изображения')
		},
	})

	const onSubmit: SubmitHandler<IUpdateCategory> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading, deleteImage }
}
