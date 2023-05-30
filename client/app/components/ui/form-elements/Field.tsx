import clsx from 'clsx'
import { forwardRef } from 'react'

import styles from './Form.module.scss'
import { IField } from './form-elements.interface'

const Field = forwardRef<HTMLInputElement, IField>(({ placeholder, error, type = 'text', style, ...rest }, ref) => {
	return (
		<div className={clsx(styles.field, styles.common)} style={style}>
			<label>
				<span>{placeholder}</span>
				<input type={type} ref={ref} autoComplete='off' {...rest} />
			</label>
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	)
})
export default Field
