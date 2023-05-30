import { FC } from 'react'

import Meta from '@/utils/meta/Meta'

import styles from './Contacts.module.scss'

const Contacts: FC = () => {
	return (
		<Meta title={'Контакты'}>
			<section className={styles.wrapper}></section>
		</Meta>
	)
}

export default Contacts
