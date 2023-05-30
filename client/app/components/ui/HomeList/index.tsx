import Link from 'next/link'
import { FC } from 'react'
import { IProduct } from 'types/product.types'

import { ILinkPath } from '../BreadCrumbs'
import SubHeading from '../SubHeading'

export interface IHomeList {
	link: ILinkPath
	items: IProduct[]
}

const HomeList: FC<IHomeList> = ({ link, items }) => {
	return (
		<div>
			<Link href={link.link}>
				<SubHeading>{link.name}</SubHeading>
			</Link>
			<ul>
				{items.map((item, index) => (
					<li key={index}>
						{/* <Link href={}>
                        
                        </Link> */}
					</li>
				))}
			</ul>
		</div>
	)
}

export default HomeList
