import { useRouter } from 'next/router'
import { ChangeEvent, FC } from 'react'

import SkeletonLoader from '../SkeletonLoader'

import AdminHeader from './AdminHeader'
import styles from './AdminTable.module.scss'
import AdminTableHeader from './AdminTableHeader'
import AdminTableItem, { ITableItem } from './AdminTableItem'

export interface IAdminTable {
	tableItems: ITableItem[]
	isLoading: boolean
	headerItems: string[]
	removeHandler: (id: number) => void
	onClick?: () => void
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const AdminTable: FC<IAdminTable> = ({
	tableItems,
	isLoading,
	headerItems,
	removeHandler,
	onClick,
	searchTerm,
	handleSearch,
}) => {
	const { push } = useRouter()
	return (
		<div className={styles.wrapper}>
			<AdminHeader searchTerm={searchTerm} handleSearch={handleSearch} onClick={onClick} />
			<AdminTableHeader headerItems={headerItems} />
			{isLoading ? (
				<SkeletonLoader className='mt-4' count={10} />
			) : tableItems.length ? (
				tableItems.map((item, index) => (
					<AdminTableItem key={index} removeHandler={() => removeHandler(item.id)} tableItem={item} />
				))
			) : (
				<div className={styles.notFound}>Ничего не найдено</div>
			)}
		</div>
	)
}

export default AdminTable
