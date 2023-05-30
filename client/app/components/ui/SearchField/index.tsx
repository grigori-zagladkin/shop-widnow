import { ChangeEvent, FC } from 'react'

import MaterialIcon from '../MaterailIcon'

import styles from './SearchField.module.scss'

export interface ISearchField {
	searchTerm: string
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch }) => (
	<div className={styles.search}>
		<input placeholder='Поиск' value={searchTerm} onChange={handleSearch} />
		<MaterialIcon name='MdSearch' />
	</div>
)

export default SearchField
