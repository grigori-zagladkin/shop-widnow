import { FC } from 'react'

import Meta from '@/utils/meta/Meta'

import styles from './Delivery.module.scss'

const Delivery: FC = () => {
	return (
		<Meta title={'Доставка'}>
			<section className={styles.wrapper}></section>
		</Meta>
	)
}

export default Delivery
