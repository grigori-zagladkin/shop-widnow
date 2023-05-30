import { useRouter } from 'next/router'
import { FC } from 'react'

import MaterialIcon from '../MaterailIcon'

import styles from './AdminTable.module.scss'

export interface ITableItem {
	id: number
	editUrl: string
	items: string[]
}

export interface IAdminTableItem {
	tableItem: ITableItem
	removeHandler: () => void
}

const AdminTableItem: FC<IAdminTableItem> = ({ removeHandler, tableItem }) => {
	return (
		<div className={styles.item}>
			{tableItem.items.map((value) => (
				<div key={value}>{value}</div>
			))}
			<AdminActions editUrl={tableItem.editUrl} removeHandler={removeHandler} />
		</div>
	)
}

const AdminActions: FC<{ editUrl: string; removeHandler: () => void }> = ({ editUrl, removeHandler }) => {
	const { push } = useRouter()
	return (
		<div className={styles.actions}>
			<button onClick={() => push(editUrl)}>
				<MaterialIcon name='MdEdit' />
			</button>
			<button onClick={removeHandler}>
				<MaterialIcon name='MdClose' />
			</button>
		</div>
	)
}

export default AdminTableItem
