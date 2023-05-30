import { ChangeEvent, FC } from 'react'

import SearchField from '../SearchField'

import AdminCreateButton from './AdminCreateButton'
import styles from './AdminTable.module.scss'

export interface IAdminHeader {
	onClick?: () => void
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const AdminHeader: FC<IAdminHeader> = ({ onClick, searchTerm, handleSearch }) => (
	<div className={styles.header}>
		<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
		{onClick && <AdminCreateButton onClick={onClick} />}
	</div>
)

export default AdminHeader
