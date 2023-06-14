import { PlusOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import Upload, { RcFile, UploadFile, UploadProps } from 'antd/es/upload'
import Image from 'next/image'
import { FC, useState } from 'react'

interface IUpload {
	countImages: number
	images: string[]
	setImages: (image: string[]) => void
}

const ImageUpload: FC<IUpload> = ({ countImages, images, setImages }) => {
	const getBase64 = (file: RcFile): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => resolve(reader.result as string)
			reader.onerror = (error) => reject(error)
		})

	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [previewTitle, setPreviewTitle] = useState('')

	const [fileList, setFileList] = useState<UploadFile[]>([])

	const handleCancel = () => setPreviewOpen(false)

	const handlePreview = async (file: UploadFile) => {
		if (!file.url || !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile)
		}

		setPreviewImage(file.url || (file.preview as string))
		setPreviewOpen(true)
		setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
	}

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		setFileList(newFileList)
		setImages([...images])
	}

	const UploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Загрузить</div>
		</div>
	)
	return (
		<>
			<Upload
				action={process.env.NEXT_APP_URL}
				listType='picture-card'
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
			>
				{fileList.length >= countImages ? null : UploadButton}
			</Upload>
			<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
				<Image src={previewImage} alt={'Картинка'} style={{ width: '100%' }} />
			</Modal>
		</>
	)
}

export default ImageUpload
