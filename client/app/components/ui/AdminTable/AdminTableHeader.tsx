import { FC } from 'react'

import styles from './AdminTable.module.scss'

const AdminTableHeader: FC<{ headerItems: string[] }> = ({ headerItems }) => (
	<div className={styles.itemHeader}>
		{headerItems.map((value) => (
			<div key={value}>{value}</div>
		))}
		<div>Действия</div>
	</div>
)

export default AdminTableHeader
