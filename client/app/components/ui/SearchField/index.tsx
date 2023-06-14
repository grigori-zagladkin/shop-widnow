import clsx from 'clsx'
import { ChangeEvent, FC } from 'react'

import MaterialIcon from '../MaterailIcon'

import styles from './SearchField.module.scss'

export interface ISearchField {
	variant: 'header' | 'admin'
	searchTerm: string
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch, variant }) => (
	<div
		className={clsx({
			[styles.search]: variant === 'header',
			[styles.searchAdmin]: variant === 'admin',
		})}
	>
		<input placeholder='Поиск' value={searchTerm} onChange={handleSearch} />
		<MaterialIcon name='MdSearch' />
	</div>
)

export default SearchField
