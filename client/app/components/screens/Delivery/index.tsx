import { FC } from 'react'

import Meta from '@/utils/meta/Meta'

import styles from './Delivery.module.scss'

const Delivery: FC = () => {
	return (
		<Meta title={'Доставка'}>
			<section className={styles.wrapper}>
				<div className={styles.delivery}>
					<h2>Доставка</h2>
					<p>Доставка товаров осуществляется в пределах области. Межгород по договорённости.</p>
				</div>
				<div className={styles.payment}>
					<h2>Оплата</h2>
					<p>Оплатить заказ вы можете:</p>
					<ul>
						<li> по наличному расчёту на территории склада</li>
						<li> безналичным переводом на карту банку по номеру телефона</li>
					</ul>
				</div>
			</section>
		</Meta>
	)
}

export default Delivery
