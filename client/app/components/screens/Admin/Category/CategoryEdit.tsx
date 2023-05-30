import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IUpdateCategory } from 'types/category.types'

import AdminLayout from '@/components/layouts/AdminLayout'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Button from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import TextField from '@/components/ui/form-elements/TextField'
import UploadField from '@/components/ui/form-elements/Upload'

import formStyles from '@/ui/form-elements/Form.module.scss'

import Meta from '@/utils/meta/Meta'

import { useCategoryEdit } from './useCategoryEdit'

const CategoryEdit: FC = () => {
	const {
		setValue,
		control,
		getValues,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IUpdateCategory>({
		mode: 'onChange',
	})
	const { isLoading, onSubmit, deleteImage } = useCategoryEdit(setValue)
	return (
		<Meta title='Редктировать категорию'>
			<AdminLayout title='Редктировать категорию'>
				{isLoading ? (
					<SkeletonLoader count={10} />
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
						<div className={formStyles.fields}>
							<Field
								{...register('title', {
									required: 'Нужно название',
								})}
								placeholder='Название'
								error={errors.title}
							/>
							<TextField
								{...register('description', {
									required: 'Нужно описание',
								})}
								placeholder='Описание'
								error={errors.description}
							/>
							<Controller
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
										removeHandler={() => deleteImage}
									/>
								)}
							/>
						</div>
						<Button>Обновить</Button>
					</form>
				)}
			</AdminLayout>
		</Meta>
	)
}

export default CategoryEdit
