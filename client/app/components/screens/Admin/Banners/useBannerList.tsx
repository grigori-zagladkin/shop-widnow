import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Modal, Popconfirm } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useRouter } from 'next/router'
import { Key, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { BannerService } from '@/services/banner.service'

import { toastrError } from '@/utils/toastrError'

import { getAdminUrl } from '@/config/url.config'

export const useBannerList = () => {
	const { push } = useRouter()
	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create banner'],
		mutationFn: () => BannerService.createBanner(),
		onError: (error) => {
			toastrError(error, 'Создание баннера')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Создание баннера', 'Успешно')
			push(getAdminUrl(`banners/${id}`))
		},
	})
	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete banner'],
		mutationFn: (bannerId: number) => BannerService.deleteBanner(bannerId),
		onSuccess: () => {
			toastr.success('Удалить баннер', 'Успешно')
			queryData.refetch()
		},
		onError: (error) => {
			toastrError(error, 'Ошибка при удалении баннера')
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
		order: number
	}
	const [isOpen, setIsOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const handleCancel = () => setIsOpen(false)
	const columns: ColumnsType<DataType> = [
		{
			title: 'ID',
			dataIndex: 'id',
			fixed: 'left',
			width: 50,
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
			title: 'Порядок',
			dataIndex: 'order',
			key: '4',
		},
		{
			title: 'Изображение',
			width: 150,
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
							title='Удалить баннер'
							description='Вы действительно хотите удалить баннер?'
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
	const queryData = useQuery({
		queryKey: ['list of banners'],
		queryFn: () => BannerService.getAllBanners(),
		select: ({ data }) =>
			data.map(
				(banner, idx): DataType => ({
					id: banner.id,
					editUrl: getAdminUrl(`banners/${banner.id}`),
					title: banner.title,
					description: banner.description.slice(0, 20) + '...',
					key: idx,
					image: banner.image,
					order: banner.order,
				}),
			),
	})

	return useMemo(
		() => ({
			...queryData,
			createAsync,
			deleteAsync,
			columns,
		}),
		[queryData, createAsync, deleteAsync],
	)
}
