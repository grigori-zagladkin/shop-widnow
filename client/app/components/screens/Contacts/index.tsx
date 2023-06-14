import { FC } from 'react'

import Meta from '@/utils/meta/Meta'

import styles from './Contacts.module.scss'

const Contacts: FC = () => {
	const leftAside: string[] = ['Наш адрес', 'Номер телефона', 'Время работы', 'Дни работы', 'Мы в whatsapp', 'Оплата']
	const rightAside: string[] = [
		'Россия, Ярославль, Гагарина, 65',
		'+79959864777',
		'08:00-20:00',
		'Без обеда и выходных',
		'+79959864777',
		'Оплата производится на наличному расчёту на территории склада, либо переводом на карту банка Tinkoff',
	]
	return (
		<Meta title={'Контакты'}>
			<section className={styles.wrapper}>
				<h2>Контакты</h2>
				<div></div>
				<div></div>
			</section>
		</Meta>
	)
}

export default Contacts
