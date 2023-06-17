import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Modal, Popconfirm, message } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useRouter } from 'next/router'
import { ChangeEvent, Key, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { useDebounced } from '@/hooks/useDebounced'

import { CategoryService } from '@/services/category.service'

import { toastrError } from '@/utils/toastrError'

import { getAdminUrl } from '@/config/url.config'

export const useAdminCategories = () => {
	const { push } = useRouter()
	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create category'],
		mutationFn: () => CategoryService.createCategory(),
		onError: (error) => {
			toastrError(error, 'Создание категории')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Создание категории', 'Успешно')
			push(getAdminUrl(`categories/${id}`))
		},
	})
	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete category'],
		mutationFn: (categoryId: number) => CategoryService.deleteCategory(categoryId),
		onSuccess: () => {
			toastr.success('Удалить категорию', 'Успешно')
			queryData.refetch()
		},
		onError: (error) => {
			toastrError(error, 'Ошибка при удалении категории')
		},
	})
	const confirm = (id: number) => {
		deleteAsync(id)
	}
	const cancel = (e: React.MouseEvent<HTMLElement>) => {}
	interface DataType {
		key: Key
		id: number
		title: string
		description: string
		editUrl: string
		image: string
	}
	const [isOpen, setIsOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const handleCancel = () => setIsOpen(false)
	const columns: ColumnsType<DataType> = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: '1',
		},
		{
			title: 'Название',
			dataIndex: 'title',
			key: '2',
		},
		{
			title: 'Описание',
			dataIndex: 'description',
			key: '3',
		},
		{
			title: 'Изображение',
			width: 50,
			dataIndex: 'image',
			key: 'image',
			render: (image) => (
				<>
					<img
						onClick={() => {
							setIsOpen(true)
							setPreviewImage(image)
						}}
						src={image}
						alt={image}
						className='w-[45px] h-[45px]'
					/>
					<Modal open={isOpen} footer={null} title='Картинка' onCancel={handleCancel}>
						<img src={previewImage} alt='Картинка' className='w-full' />
					</Modal>
				</>
			),
		},
		{
			title: 'Действия',
			key: 'editUrl',
			dataIndex: 'editUrl',
			render: (editUrl) => (
				// <div >
				<div className='flex items-center gap-[20px]'>
					<a>
						<EditOutlined
							onClick={() => {
								push(editUrl)
							}}
						/>
					</a>
					<a>
						<Popconfirm
							title='Удалить категорию'
							description='Вы действительно хотите удалить категорию?'
							onConfirm={() => {
								let str = editUrl.split('/'),
									id = Number(str[str.length - 1])
								confirm(id)
							}}
							onCancel={cancel}
							okText='Да'
							cancelText='Нет'
						>
							<DeleteOutlined />
						</Popconfirm>
					</a>
				</div>
				//
				// </div>
			),
		},
	]
	const [searchTerm, setSearchTerm] = useState<string>('')
	const debouncedValue = useDebounced(searchTerm, 500)
	const queryData = useQuery({
		queryKey: ['list of categories', debouncedValue],
		queryFn: () => CategoryService.getAllCategories(debouncedValue),
		select: ({ data }) =>
			data.map(
				(category, idx): DataType => ({
					id: category.id,
					editUrl: getAdminUrl(`categories/${category.id}`),
					title: category.title,
					description: category.description.slice(0, 20) + '...',
					key: idx,
					image: category.image,
				}),
			),
	})
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			createAsync,
			deleteAsync,
			searchTerm,
			columns,
		}),
		[queryData, createAsync, deleteAsync, searchTerm],
	)
}
