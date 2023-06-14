import { Button, Form, Input } from 'antd'
import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IUpdateCategory } from 'types/category.types'

import AdminLayout from '@/components/layouts/AdminLayout'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

import formStyles from '@/ui/form-elements/Form.module.scss'

import Meta from '@/utils/meta/Meta'

import ImageUpload from '@/components/ui/form-elements/ImageUpload'
import { useCategoryEdit } from './useCategoryEdit'

const CategoryEdit: FC = () => {
	const {
		setValue,
		control,
		handleSubmit,
	} = useForm<IUpdateCategory>({
		mode: 'onChange',
	})
	const { isLoading, onSubmit } = useCategoryEdit(setValue)
	const [images, setImages] = useState<string[]>()
	return (
		<Meta title='Редктировать категорию'>
			<AdminLayout>
				{isLoading ? (
					<SkeletonLoader count={10} />
				) : (
					<Form onSubmitCapture={handleSubmit(onSubmit)} className={formStyles.form}>
						<Form.Item>
							<Controller
								control={control}
								name='title'
								render={({ field }) => <Input {...field} placeholder='Название катгеории' />}
							/>
						</Form.Item>

						<Form.Item>
							<Controller
								control={control}
								name='description'
								render={({ field }) => <Input.TextArea {...field} placeholder='Описание катгеории' />}
							/>
						</Form.Item>

						<Form.Item>
							<Controller control={control} name='image' render={({field}) => <ImageUpload {...field} countImages={1} images={} setImages= />} /> 
						</Form.Item>

						<Form.Item>
							<Button htmlType='submit'>Обновить категорию</Button>
						</Form.Item>

						{/* <Controller
							name='image'
							control={control}
							defaultValue=''
							rules={{
								required: 'Нужно изображение',
							}}
							render={({ field: { value, onChange }, fieldState: { error } }) => (
								<UploadField
									onChange={onChange}
									folder='categories'
									placeholder={'Изображение'}
									isNoImage={false}
									image={value}
								/>
							)}
						/>
						<Button type='submit'>Обновить</Button> */}
					</Form>
				)}
			</AdminLayout>
		</Meta>
	)
}

export default CategoryEdit
