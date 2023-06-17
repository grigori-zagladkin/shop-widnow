import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/es/upload'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
import { FC, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { IUpdateCategory } from 'types/category.types'

import { getBase64 } from '../Product/ProductImageUpload'

interface IProps {
	image?: string
	setValue: UseFormSetValue<IUpdateCategory>
}

const CategoryImageUpload: FC<IProps> = ({ setValue, image }) => {
	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState(image)
	const [previewTitle, setPreviewTitle] = useState('Изображение')

	const [fileList, setFileList] = useState<UploadFile[]>(
		image
			? [
					{
						name: '',
						uid: '-1',
						thumbUrl: image,
					},
			  ]
			: [],
	)

	const handleCancel = () => setPreviewOpen(false)

	const onChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
		setFileList(newFileList)
		if (newFileList[0]?.originFileObj) {
			let base64 = await getBase64(newFileList[0]?.originFileObj as RcFile)
			setValue('image', base64)
		}
	}

	const handlePreview = async (file: UploadFile) => {
		if (image) {
			setPreviewImage(image)
		} else if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile)
		}
		setPreviewImage(image || file.url || (file.preview as string))
		setPreviewOpen(true)
	}

	const onRemove = () => {
		setValue('image', '')
	}

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	)

	return (
		<>
			<ImgCrop rotationSlider>
				<Upload
					action='/api/noop'
					accept='image/png,image/gif,image/jpeg'
					listType='picture-card'
					fileList={fileList}
					onPreview={handlePreview}
					onChange={onChange}
					onRemove={onRemove}
				>
					{fileList.length < 1 && uploadButton}
				</Upload>
			</ImgCrop>
			<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
				<img src={previewImage} className='w-full' />
			</Modal>
		</>
	)
}

export default CategoryImageUpload
