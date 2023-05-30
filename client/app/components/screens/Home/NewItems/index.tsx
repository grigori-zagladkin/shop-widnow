import { FC } from 'react'
import { IProduct } from 'types/product.types'

import ItemCard from '@/components/ui/ItemCard'
import Subheading from '@/components/ui/SubHeading'

const NewItems: FC<{ lastProducts: IProduct[] }> = ({ lastProducts }) => {
	return (
		<div>
			<Subheading>Новые товары</Subheading>
			<ul className='mt-4 flex flex-wrap gap-4'>
				{lastProducts?.length &&
					lastProducts.map((i, idx) => (
						<li key={idx}>
							<ItemCard item={i} />
						</li>
					))}
			</ul>
		</div>
	)
}

export default NewItems
