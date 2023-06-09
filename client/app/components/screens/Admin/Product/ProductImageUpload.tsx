import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/es/upload'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
import { FC, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { IUpdateProduct } from 'types/product.types'

import { getBase64 } from '@/utils/image'

interface IProps {
	images: string[]
	setValue: UseFormSetValue<IUpdateProduct>
	fileList: UploadFile[]
	setFileList: (files: UploadFile[]) => void
}

const ProductImageUpload: FC<IProps> = ({ setValue, images, fileList, setFileList }) => {
	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState(images[0])

	const handleCancel = () => setPreviewOpen(false)

	const onChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
		setFileList(newFileList)
	}

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) file.preview = await getBase64(file.originFileObj as RcFile)
		setPreviewImage(file.preview as string)
		setPreviewOpen(true)
	}

	const onRemove = (file: UploadFile) => {
		setValue(
			'images',
			fileList.filter((a, _idx) => a.thumbUrl === file.thumbUrl).map((item, idx) => item.thumbUrl),
		)
	}

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	)

	return (
		<>
			<ImgCrop quality={1} zoomSlider rotationSlider aspectSlider showGrid showReset>
				<Upload
					action='/api/noop'
					accept='image/png,image/gif,image/jpeg'
					listType='picture-card'
					fileList={fileList}
					onPreview={handlePreview}
					onChange={onChange}
					onRemove={onRemove}
					defaultFileList={fileList}
				>
					{fileList.length < 5 && uploadButton}
				</Upload>
			</ImgCrop>
			<Modal open={previewOpen} title={'Изображение'} footer={null} onCancel={handleCancel}>
				<img src={previewImage} className='w-full' />
			</Modal>
		</>
	)
}

export default ProductImageUpload
