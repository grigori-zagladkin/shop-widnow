import { ChevronRightIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { FC, useState } from 'react'
import { ICategory } from 'types/category.types'

import CategoriesModalList from '../../CategoriesModalList'

const CategoryBlock: FC<{ categories: ICategory[] }> = ({ categories }) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div className='h-fit'>
			<CategoriesModalList
				isOpen={isOpen}
				categories={categories}
				handleCancel={() => {
					setIsOpen(false)
				}}
			/>
			<div
				onClick={() => {
					setIsOpen(true)
				}}
				className='text-2xl block font-semibold mb-4 hover:text-slate-500 max-w-fit pb-2 transition'
			>
				Все категории
				<ChevronRightIcon />
			</div>
			<ul className='flex flex-col gap-[20px]'>
				{categories?.length &&
					categories.map((c, index) => (
						<li key={index}>
							<Link className='flex gap-[20px] items-center' href={`/category/${c.slug}`}>
								<img alt='Изображение категории' className='w-[40px] h-[40px] rounded-full' src={c.image} />
								<span className='text-xl hover:text-slate-500'>{c.title}</span>
							</Link>
						</li>
					))}
			</ul>
		</div>
	)
}

export default CategoryBlock
