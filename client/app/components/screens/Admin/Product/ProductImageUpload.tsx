import { PlusOutlined } from '@ant-design/icons'
import { Modal, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import Upload, { RcFile } from 'antd/es/upload'
import Image from 'next/image'
import { FC, useState } from 'react'

export const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = (error) => reject(error)
	})

const ProductImageUpload: FC = () => {
	const [fileList, setFileList] = useState<UploadFile[]>([])

	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [previewTitle, setPreviewTitle] = useState('')

	const handleCancel = () => setPreviewOpen(false)

	const handlePreview = async (file: UploadFile) => {}

	const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		setFileList(newFileList)
	}

	const UploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Загрузить</div>
		</div>
	)

	return (
		<>
			<ImgCrop rotationSlider>
				<Upload listType='picture-card' onPreview={handlePreview} onChange={onChange} fileList={fileList}>
					{fileList.length >= 5 ? null : UploadButton}
				</Upload>
			</ImgCrop>
			<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
				<Image alt={previewTitle} style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</>
	)
}

export default ProductImageUpload
