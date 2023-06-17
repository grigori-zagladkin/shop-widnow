import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { IUpdateBanner } from 'types/banner.types'

import Meta from '@/utils/meta/Meta'

import { useBannerEdit } from './useBannerEdit'

const BannerEdit: FC = () => {
	const { setValue } = useForm<IUpdateBanner>({
		mode: 'onChange',
	})
	const {} = useBannerEdit(setValue)
	return <Meta title='Редактирование баннера'></Meta>
}

export default BannerEdit
