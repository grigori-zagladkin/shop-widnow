import { Button, Form, Input, Select } from 'antd'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IUpdateAttribute } from 'types/attribute.types'

import SkeletonLoader from '@/components/ui/SkeletonLoader'

import Meta from '@/utils/meta/Meta'

import { useAttributeEdit } from './useAttributeEdit'

const AttributeEdit: FC = () => {
	const {
		control,
		setValue,
		getValues,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUpdateAttribute>({
		mode: 'onChange',
	})
	const {
		isLoading,
		onSubmit,
		attributeData,
		categoriesData: { data, isLoading: isCategoriesLoading },
	} = useAttributeEdit(setValue)
	return (
		<Meta title='Редактирование атрибута'>
			{isLoading ? (
				<SkeletonLoader count={5} />
			) : (
				<Form onSubmitCapture={handleSubmit(onSubmit)}>
					<Form.Item label='Название'>
						<Controller
							name='title'
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									value={attributeData.data.title || getValues().title || ''}
									placeholder='Название категории'
								/>
							)}
						/>
					</Form.Item>

					<Form.Item label='Категории'>
						<Controller
							name='categories'
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									mode='multiple'
									size='large'
									defaultValue={attributeData.data.categories || []}
									value={getValues().categories || []}
									options={data}
									onChange={(value: number | number[]) => {
										if (Array.isArray(value)) {
											setValue('categories', value)
										} else {
											setValue('categories', [value])
										}
									}}
								/>
							)}
						/>
					</Form.Item>

					<Form.Item>
						<Button htmlType='submit'>Обновить атрибут</Button>
					</Form.Item>
				</Form>
			)}
		</Meta>
	)
}

export default AttributeEdit
