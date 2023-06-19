import { Button, Form, Input, Skeleton } from 'antd'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IUpdateBanner } from 'types/banner.types'

import Meta from '@/utils/meta/Meta'

import { useBannerEdit } from './useBannerEdit'

const DynamicUpload = dynamic(() => import('./BannerImageUpload'), { ssr: false })

const BannerEdit: FC = () => {
	const { setValue, control, handleSubmit, watch, getValues } = useForm<IUpdateBanner>({
		mode: 'onChange',
	})
	const { isLoading, onSubmit, data } = useBannerEdit(setValue)
	return (
		<Meta title='Редактировать категорию'>
			{isLoading ? (
				<Skeleton />
			) : (
				<Form
					onSubmitCapture={handleSubmit(onSubmit)}
					labelCol={{ flex: '100px' }}
					labelAlign='left'
					labelWrap
					wrapperCol={{ flex: 1 }}
					colon={false}
				>
					<Form.Item label='Заголовок'>
						<Controller
							control={control}
							name='title'
							render={({ field }) => (
								<Input {...field} value={data.data.title || getValues().title} placeholder='Заголовок' />
							)}
						/>
					</Form.Item>

					<Form.Item label='Порядок'>
						<Controller
							control={control}
							name='order'
							render={({ field }) => (
								<Input {...field} type='number' value={data.data.order || getValues().order} placeholder='Порядок' />
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
									placeholder='Описание'
								/>
							)}
						/>
					</Form.Item>

					<Form.Item label='Картинка'>
						<DynamicUpload setValue={setValue} image={data.data.image || watch().image || ''} />
					</Form.Item>

					<Form.Item>
						<Button htmlType='submit'>Обновить баннер</Button>
					</Form.Item>
				</Form>
			)}
		</Meta>
	)
}

export default BannerEdit
