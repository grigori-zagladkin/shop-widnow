import { Button, Form, Input } from 'antd'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IUpdateCategory } from 'types/category.types'

import SkeletonLoader from '@/components/ui/SkeletonLoader'

import formStyles from '@/ui/form-elements/Form.module.scss'

import Meta from '@/utils/meta/Meta'

import CategoryImageUpload from './CategoryImageUpload'
import { useCategoryEdit } from './useCategoryEdit'

const DynamicUpload = dynamic(() => import('./CategoryImageUpload'), { ssr: false })

const CategoryEdit: FC = () => {
	const { setValue, control, handleSubmit, watch, getValues } = useForm<IUpdateCategory>({
		mode: 'onChange',
	})
	const { isLoading, onSubmit, data } = useCategoryEdit(setValue)
	return (
		<Meta title='Редактировать категорию'>
			{isLoading ? (
				<SkeletonLoader count={10} />
			) : (
				<Form onSubmitCapture={handleSubmit(onSubmit)} className={formStyles.form}>
					<Form.Item label='Название'>
						<Controller
							control={control}
							name='title'
							render={({ field }) => (
								<Input {...field} value={data.data.title || getValues().title} placeholder='Название категории' />
							)}
						/>
					</Form.Item>

					<Form.Item label='Описание'>
						<Controller
							control={control}
							name='description'
							render={({ field }) => (
								<Input.TextArea
									value={data.data.description || getValues().description}
									{...field}
									placeholder='Описание категории'
								/>
							)}
						/>
					</Form.Item>

					<Form.Item label='Картинка'>
						<DynamicUpload setValue={setValue} image={data.data.image || watch().image || ''} />
					</Form.Item>

					<Form.Item>
						<Button htmlType='submit'>Обновить категорию</Button>
					</Form.Item>
				</Form>
			)}
		</Meta>
	)
}

export default CategoryEdit
