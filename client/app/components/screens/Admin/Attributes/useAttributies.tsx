import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Popconfirm } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useRouter } from 'next/router'
import { ChangeEvent, Key, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/AdminTable/AdminTableItem'

import { useDebounced } from '@/hooks/useDebounced'

import { AttributeService } from '@/services/attribute.service'

import { toastrError } from '@/utils/toastrError'

import { getAdminUrl } from '@/config/url.config'

export const useAttributes = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const { push } = useRouter()
	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['Delete attribute'],
		mutationFn: (attributeId: number) => AttributeService.deleteAttribute(attributeId),
		onError: (error) => {
			toastrError(error, 'Удаление атрибута')
		},
		onSuccess: () => {
			toastr.success('Удалить атрибут', 'Успешно')
			queryData.refetch()
		},
	})

	interface DataType {
		key: Key
		id: number
		title: string
		editUrl: string
	}
	const confirm = (id: number) => {
		deleteAsync(id)
	}
	const cancel = (e: React.MouseEvent<HTMLElement>) => {}
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
			key: 'actions',
			title: 'Действия',
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
	const debouncedSearch = useDebounced(searchTerm, 500)
	const queryData = useQuery(
		['list of attributes', debouncedSearch],
		() => AttributeService.getAllAttributes(debouncedSearch),
		{
			onError: (error) => {
				toastrError(error, 'Не удалось загрузить информацию о атрибутах')
			},
			select: ({ data }) =>
				data.map(
					(attribute): DataType => ({
						id: attribute.id,
						editUrl: getAdminUrl(`/attributes/${attribute.id}`),
						key: attribute.id,
						title: attribute.title,
					}),
				),
		},
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['Create attribute'],
		mutationFn: () => AttributeService.createAttribute(),
		onError: (error) => {
			toastrError(error, 'Создать атрибут')
		},
		onSuccess: ({ data }) => {
			push(getAdminUrl(`/attributes/${data}`))
			toastr.success('Создать атрибут', 'успешно')
		},
	})

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			createAsync,
			deleteAsync,
			columns,
		}),
		[queryData, searchTerm, createAsync, deleteAsync],
	)
}
