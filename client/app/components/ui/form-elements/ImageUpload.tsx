import { PlusOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import Upload, { RcFile, UploadFile, UploadProps } from 'antd/es/upload'
import Image from 'next/image'
import { ChangeEvent, FC, useRef, useState } from 'react'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { IUpdateCategory } from 'types/category.types'
import { IUpdateProduct } from 'types/product.types'

interface IUpload<T> {
	image: T
	setImage: (img: T) => void
}

const getBase64 = (file: any): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = (error) => reject(error)
	})

const SoloImageUpload: FC<IUpload<string>> = ({ image, setImage }) => {
	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [previewTitle, setPreviewTitle] = useState('')

	const handleCancel = () => setPreviewOpen(false)

	const handlePreview = async (file: string) => {
		setPreviewImage(file)
		setPreviewOpen(true)
		setPreviewTitle('Изображение')
	}

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (countImages === 1) {
			let image = await getBase64(files[0])
			setImages(image)
		} else {
			// let newImage = getBase64(files[files?.length-1])
			// setImages([...images])
		}
	}

	const ref = useRef<HTMLInputElement>(null)

	return (
		<div className='flex flex-col gap-[20px]'>
			<Button type='default' onClick={() => ref.current.click()}>
				Загрузить изображение
			</Button>
			<input className='hidden' type='file' onChange={handleChange} ref={ref} />
			{Array.isArray(images) &&
				images.map((img, idx) => (
					<div>
						<Image alt={`Изображение +${img}`} src={img} key={idx} />
					</div>
				))}
			{
				<div>
					<Image width={200} height={200} alt={`Изображение +${images}`} src={images} />
				</div>
			}
			<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
				<Image src={previewImage} alt={'Картинка'} style={{ width: '100%' }} />
			</Modal>
		</div>
	)
}

const MultiImageUpload: FC<IUpload<string[]>> = { image, setImage }

export default ImageUpload
