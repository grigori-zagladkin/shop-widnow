import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Modal, Popconfirm } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useRouter } from 'next/router'
import { ChangeEvent, Key, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { useDebounced } from '@/hooks/useDebounced'

import { ProductService } from '@/services/product.service'

import { toastrError } from '@/utils/toastrError'

import { getAdminUrl } from '@/config/url.config'

export const useProducts = () => {
	interface DataType {
		key: Key
		id: number
		title: string
		description: string
		category: string
		image: string
		price: number
		count: number
		date: Date
		editUrl: string
	}
	const [isOpen, setIsOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const handleCancel = () => setIsOpen(false)
	const columns: ColumnsType<DataType> = [
		{
			key: 'id',
			dataIndex: 'id',
			title: 'ID',
		},
		{
			key: 'title',
			dataIndex: 'title',
			title: 'Название',
		},
		{
			key: 'description',
			dataIndex: 'description',
			title: 'Описание',
			render: (description: string) => <p>{description.slice(0, 20) + '...'}</p>,
		},
		{
			key: 'category',
			dataIndex: 'category',
			title: 'Категория',
		},
		{
			key: 'price',
			dataIndex: 'price',
			title: 'Цена',
		},
		{
			key: 'count',
			dataIndex: 'count',
			title: 'Кол-во',
		},
		{
			key: 'image',
			dataIndex: 'image',
			width: 50,
			title: 'Изображение',
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
			key: 'date',
			dataIndex: 'date',
			title: 'Дата добавления',
		},
		{
			title: 'Действия',
			key: 'editUrl',
			dataIndex: 'editUrl',
			render: (editUrl) => (
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
			),
		},
	]

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
	const confirm = (id: number) => {
		deleteAsync(id)
	}

	const cancel = (e: React.MouseEvent<HTMLElement>) => {}
	const [searchTerm, setSearchTerm] = useState<string>('')
	const { push } = useRouter()
	const debouncedValue = useDebounced(searchTerm, 500)
	const queryData = useQuery({
		queryKey: ['list of products', debouncedValue],
		queryFn: () => ProductService.getAllProduct({ searchTerm: debouncedValue }),
		select: ({ data }) =>
			data.products.map(
				(product): DataType => ({
					id: product.id,
					editUrl: getAdminUrl(`/products/${product.id}`),
					image: product.images[0],
					price: product.price,
					count: product.count,
					description: product.description,
					date: product.createdAt,
					category: product.category.title,
					key: String(product.id),
					title: product.title,
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
	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			createAsync,
			searchTerm,
			columns,
		}),
		[queryData, createAsync, searchTerm],
	)
}
