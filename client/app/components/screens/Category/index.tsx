import { DragHandleIcon } from '@chakra-ui/icons'
import { Modal, Pagination, PaginationProps, Select, Slider } from 'antd'
import { FC, useState } from 'react'
import { EnumSortProduct } from 'types/product.types'

import ItemCard from '@/components/ui/ItemCard'

import Meta from '@/utils/meta/Meta'

import styles from './Category.module.scss'
import { sortData } from './sort.data'
import { useCategory } from './useCategory'

const Category: FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const {
		categoryData,
		productData,
		minPrice,
		maxPrice,
		currentPage,
		perPage,
		sortType,
		searchTerm,
		setCurrentPage,
		handleChangePrice,
		handleSearch,
		setSortType,
		setPerPage,
	} = useCategory()
	const handleChangeSortType = (value: EnumSortProduct) => {
		setSortType(value)
	}
	const onChangePage: PaginationProps['onChange'] = (page) => {
		setCurrentPage(page)
	}
	return (
		<Meta title={categoryData.data?.title || 'Категория'}>
			<div className={styles.wrapper}>
				<div className={styles.sort}>
					<div className={styles.sortType}>Цена</div>
					<Slider
						range={{ draggableTrack: true }}
						onChange={handleChangePrice}
						max={100000}
						min={0}
						defaultValue={[100, 10000]}
					/>
					<div className={styles.sortType}>Сортировать по:</div>
					<Select
						defaultValue={EnumSortProduct.LOW_PRICE}
						style={{ width: 240 }}
						onChange={handleChangeSortType}
						options={sortData}
					/>
					<div className={styles.sortType}>Показывать на странице:</div>
					<Select
						defaultValue={'100'}
						style={{ width: 240 }}
						onChange={(value) => {
							setPerPage(+value)
						}}
						options={[
							{ label: 50, value: 50 },
							{ label: 100, value: 100 },
						]}
					/>
				</div>
				<div className={styles.items}>
					<div className='flex justify-between min-w-full text-3xl font-semibold'>
						<div>{categoryData.data?.title || 'Категория'}</div>
						<div
							className='lg:hidden flex items-center justify-center text-2xl p-2 rounded-full bg-gray-300  relative top-[5px]'
							onClick={() => {
								setIsOpen(true)
							}}
						>
							<DragHandleIcon className='block' />
						</div>
					</div>
					<ul className={styles.itemsWrapper}>
						{productData.data?.data?.length ? (
							productData.data?.data.products.map((item, idx) => <ItemCard item={item} key={idx} />)
						) : (
							<div></div>
						)}
					</ul>
					<Pagination
						className={styles.pagination}
						current={currentPage}
						onChange={onChangePage}
						total={productData.data?.data.length}
						pageSize={perPage}
					/>
				</div>
				<Modal
					open={isOpen}
					title='Параметры фильтрации'
					footer={null}
					onCancel={() => {
						setIsOpen(false)
					}}
				>
					<div className={styles.sortMobile}>
						<div className={styles.sortType}>Цена</div>
						<Slider
							range={{ draggableTrack: true }}
							onChange={handleChangePrice}
							max={100000}
							min={0}
							defaultValue={[100, 10000]}
						/>
						<div className={styles.sortType}>Сортировать по:</div>
						<Select
							defaultValue={EnumSortProduct.LOW_PRICE}
							style={{ width: 240 }}
							onChange={handleChangeSortType}
							options={sortData}
						/>
						<div className={styles.sortType}>Показывать на странице:</div>
						<Select
							defaultValue={'100'}
							style={{ width: 240 }}
							onChange={(value) => {
								setPerPage(+value)
							}}
							options={[
								{ label: 50, value: 50 },
								{ label: 100, value: 100 },
							]}
						/>
					</div>
				</Modal>
			</div>
		</Meta>
	)
}

export default Category
