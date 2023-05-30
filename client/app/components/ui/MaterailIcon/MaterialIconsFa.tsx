import { FC } from 'react'
import * as MaterialIcons from 'react-icons/fa'

import { useRenderClient } from '@/hooks/useRenderClient'

type TypeMaterialIconName = keyof typeof MaterialIcons

const MaterialIconFa: FC<{ name: TypeMaterialIconName }> = ({ name }) => {
	const { isRenderClient } = useRenderClient()
	const IconComponent = MaterialIcons[name]
	if (isRenderClient) return <IconComponent /> || <MaterialIcons.FaRegWindowMinimize />
	else return null
}

export default MaterialIconFa
