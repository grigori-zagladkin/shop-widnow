import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import { CSSProperties, ChangeEvent, FC, useCallback, useMemo, useState } from 'react'
import { FieldError } from 'react-hook-form'

import { FileService } from '@/services/file.service'

import { toastrError } from '@/utils/toastrError'

import MaterialIcon from '../MaterailIcon'
import SkeletonLoader from '../SkeletonLoader'

import styles from './Form.module.scss'

interface IUploadField {
	folder?: string
	image?: string
	onChange: (...event: any[]) => void
	placeholder: string
	error?: FieldError
	style?: CSSProperties
	isNoImage?: boolean
}

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder?: string,
) => {
	uploadImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState(false)

	const { mutateAsync } = useMutation({
		mutationKey: ['upload file'],
		mutationFn: (data: FormData) => FileService.createFile(data, folder),
		onSuccess: ({ data }) => {
			onChange(data[0].name)
		},
		onError: (error) => {
			toastrError(error, 'Ошибка при загрузке файла')
		},
	})

	const uploadImage = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)
			const files = e.target.files
			if (files?.length) {
				const formData = new FormData()
				formData.append('file', files[0])
				await mutateAsync(formData)

				setTimeout(() => {
					setIsLoading(false)
				}, 2000)
			}
		},
		[mutateAsync],
	)

	return useMemo(
		() => ({
			uploadImage,
			isLoading,
		}),
		[uploadImage, isLoading],
	)
}

const UploadField: FC<IUploadField> = ({ folder, image, isNoImage, onChange, placeholder, error, style }) => {
	const { uploadImage, isLoading } = useUpload(onChange, folder)
	return (
		<div className={clsx(styles.field, styles.uploadField)} style={style}>
			<div className={styles.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input type='file' onChange={uploadImage} />
					{error && <div className={styles.error}>{error?.message}</div>}
				</label>
				{!isNoImage && (
					<div>
						{isLoading ? (
							<SkeletonLoader count={3} />
						) : (
							image && (
								<div className={styles.uploadImageContainer}>
									<div
										className='absolute z-10 text-2xl'
										onClick={async () => {
											const imgPath = image.split('/')
											await FileService.deleteFile(imgPath[imgPath.length - 1], imgPath[imgPath.length - 2])
											onChange('')
										}}
									>
										<MaterialIcon name='MdClose' />
									</div>
									<Image src={image} alt='' layout='fill' unoptimized />
								</div>
							)
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
