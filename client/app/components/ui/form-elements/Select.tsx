import { FC } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import ReactSelect, { OnChangeValue, Options } from 'react-select'
import makeAnimated from 'react-select/animated'

import styles from './Form.module.scss'
import { IFieldProps } from './form-elements.interface'

export interface IOption {
	label: string
	value: number
}

export interface ISelect extends IFieldProps {
	options: Options<IOption>
	isMulti?: boolean
	field: ControllerRenderProps<any, any>
	isLoading?: boolean
}

const animatedComponents = makeAnimated()

const Select: FC<ISelect> = ({ placeholder, error, isLoading, options, field, isMulti }) => {
	const onChange = (newValue: OnChangeValue<IOption, boolean>) => {
		field.onChange(isMulti ? (newValue as IOption[]).map((item: IOption) => item.value) : (newValue as IOption).value)
	}
	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter((option) => field.value.indexOf(option.value) >= 0)
				: options.filter((option) => option.value === field.value)
		} else {
			return isMulti ? [] : ('' as any)
		}
	}
	return (
		<div className={styles.selectContainer}>
			<label>
				<span>{placeholder}</span>
				<ReactSelect
					isLoading={isLoading}
					onChange={onChange}
					value={getValue()}
					placeholder=''
					options={options}
					isMulti={isMulti}
					classNamePrefix={'custom-select'}
					components={animatedComponents}
				/>
			</label>
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	)
}

export default Select
