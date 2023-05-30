import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface IFieldProps {
	placeholder: string
	error?: FieldError | undefined
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IField extends TypeInputPropsField {}

type TypeTextAreaPropsField = TextareaHTMLAttributes<HTMLTextAreaElement> & IFieldProps

export interface ITextField extends TypeTextAreaPropsField {}
