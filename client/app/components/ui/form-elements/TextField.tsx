import clsx from 'clsx'
import { forwardRef } from 'react'

import styles from './Form.module.scss'
import { ITextField } from './form-elements.interface'

const TextField = forwardRef<HTMLTextAreaElement, ITextField>(({ placeholder, error, style, ...rest }, ref) => {
	return (
		<div className={clsx(styles.field, styles.common)} style={style}>
			<label>
				<span>{placeholder}</span>
				<textarea ref={ref} autoComplete='off' {...rest} />
			</label>
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	)
})
export default TextField
