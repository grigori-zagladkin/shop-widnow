import { IBase } from './base.types'

export interface IUpdateAttribute {
	title: string
	categories: number[]
}

export type IAttribute = IUpdateAttribute & IBase
