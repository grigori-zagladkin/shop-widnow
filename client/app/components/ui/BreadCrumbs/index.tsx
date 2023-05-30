import Link from 'next/link'
import { FC } from 'react'

export interface ILinkPath {
	name: string
	link: string
}

const BreadCrumbs: FC<{ path: Array<ILinkPath> }> = ({ path }) => {
	return (
		<div>
			{path.map((item, index) => {
				if (index === path.length - 1) {
					return <Link href={item.link}>{item.name}</Link>
				} else {
					return (
						<>
							<Link href={item.link}>{item.name}</Link> -
						</>
					)
				}
			})}
		</div>
	)
}

export default BreadCrumbs
