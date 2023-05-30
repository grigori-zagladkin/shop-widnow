import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IUpdateAttribute } from 'types/attribute.types'

import AdminLayout from '@/components/layouts/AdminLayout'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Button from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'

import styles from '@/ui/form-elements/Form.module.scss'

import Meta from '@/utils/meta/Meta'

import { useAttributeEdit } from './useAttributeEdit'
import { useCategoriesAdmin } from './useCategoriesAdmin'

const DynamicSelect = dynamic(() => import('../../../ui/form-elements/Select'), {
	ssr: false,
})

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
	const { isLoading, onSumbit } = useAttributeEdit(setValue)
	const { data: categoriesData, isLoading: isCategoriesLoading } = useCategoriesAdmin()
	return (
		<Meta title='Редактирование аттрибута'>
			<AdminLayout title='Редактирование аттрибута'>
				{isLoading ? (
					<SkeletonLoader count={5} />
				) : (
					<form onSubmit={handleSubmit(onSumbit)} className={styles.form}>
						<div>
							<Field
								{...register('title', {
									required: 'Введите название',
								})}
								placeholder='Название атрибута'
								error={errors.title}
							/>
							<Controller
								name='categories'
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
										isMulti
										isLoading={isCategoriesLoading}
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

export default AttributeEdit
