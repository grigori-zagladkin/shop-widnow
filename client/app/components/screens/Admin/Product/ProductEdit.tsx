import dynamic from 'next/dynamic'
import { FC, Fragment, useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { IUpdateProduct } from 'types/product.types'

import AdminLayout from '@/components/layouts/AdminLayout'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import MyButton from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import TextField from '@/components/ui/form-elements/TextField'

import Meta from '@/utils/meta/Meta'

import MultiUpload from './MultiUpload'
import { useAttributeData } from './useAttributeData'
import { useCategoryData } from './useCategoryData'
import { useProductEdit } from './useProductEdit'

const DynamicSelect = dynamic(() => import('../../../ui/form-elements/Select'), {
	ssr: false,
})

const ProductEdit: FC = () => {
	const {
		control,
		setValue,
		getValues,
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<IUpdateProduct>({
		mode: 'onChange',
	})
	const {
		productData: { isLoading, data },
		onSubmit,
	} = useProductEdit(setValue)
	const { isLoading: isCategoriesLoading, data: categoriesData } = useCategoryData()
	const { data: attributeData, isLoading: isAttributeLoading, refetch } = useAttributeData(setValue, watch)
	const { fields, append, remove, update } = useFieldArray({ control, name: 'attributes' })
	useEffect(() => {
		setValue('categoryId', 2)
		refetch()
		attributeData?.forEach((item, idx) => {
			append({
				id: idx,
				value: item.value,
				attribute: item.attribute,
			})
		})
	}, [])
	const images = watch('images')
	useEffect(() => {
		fields.forEach((item) => {
			remove(item.id)
		})
		attributeData?.forEach((item, idx) => {
			append({
				id: idx,
				value: item.value,
				attribute: item.attribute,
			})
		})
	}, [watch().categoryId])
	return (
		<Meta title='Редактирование товара'>
			<AdminLayout title='Редактирование товара'>
				{isLoading ? (
					<SkeletonLoader count={10} />
				) : (
					<form onSubmit={handleSubmit(onSubmit)}>
						<div>
							<Field
								{...register('title', {
									required: 'Введите название',
								})}
								placeholder='Название товара'
								error={errors.title}
							/>
							<Controller
								name='categoryId'
								control={control}
								rules={{
									required: 'Выберите категории/категорию',
								}}
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										error={error}
										field={field}
										placeholder='Категории'
										options={categoriesData || []}
										isLoading={isCategoriesLoading}
									/>
								)}
							/>
							<Field
								{...register('price', {
									required: 'Введите цену',
								})}
								placeholder='Цена товара'
								error={errors.price}
								type='number'
							/>
							<Field
								{...register('count', {
									required: 'Введите количество',
								})}
								placeholder='Количество товара'
								error={errors.count}
								type='number'
							/>
							<TextField
								{...register('description', {
									required: 'Описание',
								})}
								placeholder='Описание товара'
								error={errors.description}
							/>
							{isAttributeLoading ? (
								<SkeletonLoader count={4} />
							) : (
								fields?.map((item, index) => (
									<Fragment key={index}>
										<div className='flex gap-4 items-center'>
											<Field
												{...register(`attributes.${index}.attribute`, {
													required: 'Введите название атрибута',
												})}
												placeholder='Название атрибута'
											/>
											<Field
												{...register(`attributes.${index}.value`, {
													required: 'Введите название атрибута',
												})}
												placeholder='Значение атрибута'
											/>
											<MyButton
												onClick={() => {
													remove(index)
												}}
											>
												Убрать свойство
											</MyButton>
										</div>
									</Fragment>
								))
							)}
							<MyButton
								onClick={() => {
									append({ value: '', attribute: '', id: 1 })
								}}
							>
								Добавить атрибут
							</MyButton>
							<MultiUpload watch={watch} setValue={setValue} />
							<MyButton
								onClick={() => {
									append({ value: '', attribute: '', id: 1 })
								}}
							>
								Добавить картинку
							</MyButton>
						</div>
						<MyButton type='submit'>Обновить</MyButton>
					</form>
				)}
			</AdminLayout>
		</Meta>
	)
}

export default ProductEdit
