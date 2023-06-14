import { PlusOutlined } from '@ant-design/icons'
import { Modal, notification } from 'antd'
import Upload, { RcFile, UploadFile, UploadProps } from 'antd/es/upload'
import { FC, useState } from 'react'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { IUpdateProduct } from 'types/product.types'

import { FileService } from '@/services/file.service'

const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = (error) => reject(error)
	})

const UploadButton: FC | null = () => (
	<div>
		<PlusOutlined />
		<div style={{ marginTop: 8 }}>Upload</div>
	</div>
)

interface IUpload {
	watch: UseFormWatch<IUpdateProduct>
	setValue: UseFormSetValue<IUpdateProduct>
}

const MultiUpload: FC<IUpload> = ({ watch, setValue }) => {
	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [previewTitle, setPreviewTitle] = useState('')
	let _images = watch()?.images?.length ? watch().images : []
	let images = watch()?.images?.length
		? [
				...watch().images.map(
					(item, idx): UploadFile => ({
						uid: String(idx),
						name: item,
						url: `/uploads/products/${item}`,
					}),
				),
		  ]
		: []
	const [fileList, setFileList] = useState<UploadFile[]>(images)
	const handleCancel = () => setPreviewOpen(false)

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile)
		}

		setPreviewImage(file.url || (file.preview as string))
		setPreviewOpen(true)
		setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
	}

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		setFileList(newFileList)
	}
	const onUploadSuccess = async (options: any) => {
		const { file } = options
		const fmData = new FormData()
		fmData.append('file', file)
		try {
			let data = await FileService.createFile(fmData, 'products')
			let filePath = data.data[0].url.split('/')
			let fileName = filePath[filePath.length - 1]
			setFileList([
				...fileList,
				{
					uid: String(Math.random() * 10000),
					url: data.data[0].name,
					status: 'done',
					name: data.data[0].url,
				},
			])
			setValue('images', [..._images, data.data[0].name])
		} catch (err) {
			notification.error({
				message: 'Ошибка!',
				description: 'Не удалось загрузить файл',
				duration: 2,
			})
		}
	}
	return (
		<>
			<Upload
				customRequest={onUploadSuccess}
				listType='picture-card'
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
			>
				{fileList.length >= 8 ? <></> : <UploadButton />}
			</Upload>
			<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
				<img alt='example' style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</>
	)
}

export default MultiUpload
