import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Space } from 'antd'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IUpdateProduct } from 'types/product.types'

import SkeletonLoader from '@/components/ui/SkeletonLoader'

import Meta from '@/utils/meta/Meta'

import { useAttributeData } from './useAttributeData'
import { useCategoryData } from './useCategoryData'
import { useProductEdit } from './useProductEdit'

const ProductEdit: FC = () => {
	const { control, setValue, getValues, handleSubmit, watch } = useForm<IUpdateProduct>({
		mode: 'onChange',
	})
	const {
		productData: { isLoading, data },
		onSubmit,
	} = useProductEdit(setValue)
	const { isLoading: isCategoriesLoading, data: categoriesData } = useCategoryData()
	const { data: attributeData, isLoading: isAttributeLoading, refetch } = useAttributeData(setValue, watch)
	return (
		<Meta title='Редактирование товара'>
			{isLoading ? (
				<SkeletonLoader count={10} />
			) : (
				<Form
					onFinish={handleSubmit(onSubmit)}
					labelCol={{ flex: '100px' }}
					labelAlign='left'
					labelWrap
					wrapperCol={{ flex: 1 }}
					colon={false}
				>
					<Form.Item label='Название'>
						<Controller
							control={control}
							name='title'
							render={({ field }) => <Input {...field} value={getValues().title} placeholder='Название' />}
						/>
					</Form.Item>

					<Form.Item label='Цена'>
						<Controller
							control={control}
							name='price'
							render={({ field }) => <Input {...field} type='number' value={getValues().price} placeholder='Цена' />}
						/>
					</Form.Item>

					<Form.Item label='Количество'>
						<Controller
							control={control}
							name='count'
							render={({ field }) => (
								<Input {...field} type='number' value={getValues().count} placeholder='Количество' />
							)}
						/>
					</Form.Item>

					<Form.Item label='Описание'>
						<Controller
							control={control}
							name='description'
							render={({ field }) => (
								<Input.TextArea {...field} value={getValues().description} placeholder='Описание' />
							)}
						/>
					</Form.Item>

					<Form.Item label='Категория'>
						<Controller
							control={control}
							name='category'
							render={({ field }) => (
								<Select
									{...field}
									size='large'
									options={categoriesData || []}
									value={getValues().categoryId}
									onChange={(value: number) => {
										setValue('categoryId', value)
									}}
								/>
							)}
						/>
					</Form.Item>

					<Form.List name='attributes'>
						{(fields, { add, remove }) => (
							<>
								{fields.map(({ key, name, ...restField }) => (
									<Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
										<Form.Item {...restField} name='' label='Название атрибута'>
											<Controller
												control={control}
												name={`attributes.${key}.attribute`}
												render={({ field }) => <Input {...field} placeholder='Название атрибута' />}
											/>
										</Form.Item>
										<Form.Item label='Значение атрибута'>
											<Controller
												name={`attributes.${key}.value`}
												control={control}
												render={({ field }) => <Input {...field} />}
											/>
										</Form.Item>
										<MinusCircleOutlined className='block relative top-[-1px]' onClick={() => remove(name)} />
									</Space>
								))}
								<Form.Item label='Фотография'>
									{/* <Controller control={control} name='images' render={({field}) => <ProductImageUpload {...field} />} /> */}
								</Form.Item>

								<Form.Item>
									<Button
										type='dashed'
										className='inline-flex items-center w-full justify-center'
										onClick={() => add()}
									>
										<PlusOutlined /> Добавить свойство
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>

					<Form.Item>
						<Button className='inline-flex items-center w-full justify-center' htmlType='submit'>
							Обновить
						</Button>
					</Form.Item>
				</Form>
			)}
		</Meta>
	)
}

export default ProductEdit
