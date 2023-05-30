import clsx from 'clsx'
import { FC } from 'react'
import Skeleton, { SkeletonProps } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader: FC<SkeletonProps> = ({ className, ...rest }) => (
	<Skeleton
		{...rest}
		className={clsx('rounded-lg', className)}
		baseColor='rgb(247, 245, 245)'
		highlightColor='rgb(187, 240, 140)'
	/>
)

export default SkeletonLoader
