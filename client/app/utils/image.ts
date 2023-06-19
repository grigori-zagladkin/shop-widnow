import { RcFile } from 'antd/es/upload'

export const dataURItoBlob = (dataURI: string) => {
	const byteString = atob(dataURI.split(',')[1])
	const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
	const ab = new ArrayBuffer(byteString.length)
	const ia = new Uint8Array(ab)
	for (let i = 0; i < byteString.length; ++i) {
		ia[i] = byteString.charCodeAt(i)
	}
	return new Blob([ab], { type: mimeString })
}

export const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = (error) => reject(error)
	})
