import { FC } from 'react'

import SearchField from '@/components/ui/SearchField'

import styles from './Search.module.scss'
import SearchList from './SearchList'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const { isSuccess, data, handleSearch, searchTerm } = useSearch()
	return (
		<div className={styles.wrapper}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && <SearchList products={data?.products || []} />}
		</div>
	)
}

export default Search
