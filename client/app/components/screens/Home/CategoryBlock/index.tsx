import Link from 'next/link'
import { FC } from 'react'
import { ICategory } from 'types/category.types'

import Subheading from '@/components/ui/SubHeading'

const CategoryBlock: FC<{ categories: ICategory[] }> = ({ categories }) => {
	return (
		<div className='h-fit'>
			<Link href={'/categories'}>
				<Subheading>Категории</Subheading>
			</Link>
			<ul>
				{categories?.length &&
					categories.map((c, index) => (
						<li key={index}>
							<Link href={`/category/${c.slug}`}>{c.title}</Link>
						</li>
					))}
			</ul>
		</div>
	)
}

export default CategoryBlock
